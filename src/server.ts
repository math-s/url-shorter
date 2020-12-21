import express from 'express'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import router from './routes'

dotenv.config()

const app = express()

/** Parse the body of the request */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(router)

app.listen(3000, () => {
  console.log('listening on port 3000...')
})
