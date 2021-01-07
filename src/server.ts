import express from 'express'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import router from './routes'
import validate from './auth'
import helmet from 'helmet'

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(helmet())
app.disable('x-powered-by')

app.use(router)

app.listen(3001, () => {
  console.log('listening on port 3001...')
})
