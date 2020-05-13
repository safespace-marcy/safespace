const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const serverKey = require('./.keyEnv')


const validateInputs = (username, email, password) => {
  const usernameRegex = /\W/i
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if(username.length < 6 || username.length > 30 || usernameRegex.test(username)) return false
  if(emailRegex.test(email.toLowerCase()) === false) return false
  if(!password) return false 
  return true
}

const register = async(req, res) => {
  try{
    const {username, email, password} = req.body
    if(!validateInputs(username, email, password)) throw "Invalid Username, Email, or Password."
    const saltRounds = 7
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    User.addUser(username, email, hashedPassword)
    const token = jwt.sign({username: username, password: hashedPassword}, serverKey)
    res.cookie('safeToken', token)
  }
  catch(err) {
    res.send('err')
  }
}

const login = async(req, res) => {
  try{
    const {username, password} = req.body
    const user = await User.getByUsername(username)
    if(!user){
      return res.status(401).send('User Does Not Exist.')
    }
    
    const isValidPassword = await bcrypt.compare(password, user.hashedPassword)
    
    if(isValidPassword){
      const token = jwt.sign({username: user.username, email: user.email, password: user.hashedPassword})
      res.cookie('safeToken', token)
    }
  }
  catch (err) {
    res.send('err')
  }
}
