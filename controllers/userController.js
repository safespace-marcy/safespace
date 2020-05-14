const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const serverKey = require('./.keyEnv')

/**
* Validates users registration credentials
* @param {string} username - The user's chosen tagname
* @param {string} email - The user's email address
* @param {string} password - The user's password (to be hashed client-side and server-side)
*/
const validateInputs = (username, email, password) => {
  const usernameRegex = /\W/i
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (username.length < 6 || username.length > 30 || usernameRegex.test(username)) return false
  if (emailRegex.test(email.toLowerCase()) === false) return false
  if (!password) return false
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
    if (!validateInputs(username, email, password)) throw Error('Invalid Username, Email, or Password.')
    const saltRounds = 7
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    User.add(username, email, hashedPassword)
    const token = jwt.sign({ username: username}, serverKey)
    res.cookie('safeToken', token)
  } catch (err) {
    res.send(err)
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
      const token = jwt.sign({ username: user.username})
      res.cookie('safeToken', token)
    }
  } catch (err) {
    res.send('err')
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
    if (!user.email === email) throw Error('Incorrect credentials')
    const isValidPassword = await bcrypt.compare(password, user.hashedPassword)
    if (isValidPassword) {
      User.deleteAccount(email)
    }
  } catch (err) {
    res.send(err)
  }
}

/**
* Clears the user's cookie containing the token that verifies their identity
* @param {object} req - The request object containing users credentials
* @param {object} res - The response object used to send a repsonse back to the client
*/
const logout = (req, res) => {
  res.clearCookie('safeToken')
}

module.exports = {
  register,
  login,
  logout,
  deleteAccount
}
