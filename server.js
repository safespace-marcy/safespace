require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const userRouter = require('./routes/userRouter')
const cookieParser = require('cookie-parser')
const postRouter = require('./routes/postRouter')
const communityRouter = require('./routes/communitiesRouter')

// port is specified in environment variable or default to 8080
const port = process.env.PORT || 8080
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(cookieParser())

app.use(userRouter)
app.use(postRouter)
app.use(communityRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`))
})

app.listen(port, () => console.log(`App listening on port ${port}`))
