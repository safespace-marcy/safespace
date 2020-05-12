require('dotenv').config()
const express = require('express')

const app = express()

// port is specified in environment variable or default to 8080
const port = process.env.PORT || 8080

app.listen(() => console.log(`App listening on port ${port}`))
