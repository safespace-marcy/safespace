const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

/**
 * Validates users registration credentials
 * @param {string} username - The user's chosen tagname
 * @param {string} email - The user's email address
 * @param {string} password - The user's password (to be hashed client-side and server-side)
 */
const validateInputs = (username, email, password) => {
  const usernameRegex = /\W/i
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (
    username.length < 6 ||
    username.length > 30 ||
    usernameRegex.test(username)
  ) {
    return false
  }
  if (emailRegex.test(email.toLowerCase()) === false) return false
  if (password.length < 8) return false
  return true
}

/**
 * Registers user's credentials, adding them to the database using the User model
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (validateInputs(username, email, password) === false) throw Error('Invalid Credentials.')
    const saltRounds = 7
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    User.add(username, email, hashedPassword)
    const token = jwt.sign({ username: username }, process.env.AUTH_KEY)
    res.cookie('safeToken', token).sendStatus(200)
  } catch (err) {
    res.status(500).send(err)
  }
}

/**
 * Gives the user a token after verifying user's entered credentials
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.getByUsername(username)

    if (!user) {
      return res.status(401).send('User Does Not Exist.')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (isValidPassword) {
      const token = jwt.sign({ username: user.username }, process.env.AUTH_KEY)
      res.cookie('safeToken', token).status(200).send(JSON.stringify(user))
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

/**
 * Deletes user's account after verifying user's entered credentials
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
const deleteAccount = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = await User.getByUsername(username)

    if (user.email !== email) throw Error('Incorrect Credentials')

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (isValidPassword) {
      User.deleteAccount(email)
      return res.sendStatus(200)
    }
    res.sendStatus(401)
  } catch (err) {
    res.status(500).send(err)
  }
}

/**
 * Clears the user's cookie containing the token that verifies their identity
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
const logout = (req, res) => {
  res.clearCookie('safeToken').sendStatus(200)
}

/**
 * Retrieves a user from the database and send it to the client
 * @param {object} req - The request object containing users credentials
 * @param {object} res - The response object used to send a repsonse back to the client
 */
const getUser = async (req, res) => {
  try {
    const userId = req.userId
    const user = await User.getById(userId)
    if (!user) throw Error('User Does Not Exist')
    res.status(200).send(JSON.stringify(user))
  } catch (err) {
    res.status(404).send(err)
  }
}

module.exports = {
  register,
  login,
  logout,
  deleteAccount,
  getUser
}
