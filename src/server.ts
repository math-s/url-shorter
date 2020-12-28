import express from 'express'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import router from './routes'

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(router)

// Add headers
app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', '*')

  res.header('Access-Control-Allow-Methods', '*')

  res.header('Access-Control-Allow-Headers', '*')

  next()
})


app.listen(3001, () => {
  console.log('listening on port 3001...')
})
