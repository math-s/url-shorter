import express from 'express'
import { connect } from './database/database'

const app = express()

connect()

app.listen(3000)

app.get('/api/', (req, res) => {
  console.log('GET /api')
  res.send(200)
})

app.post('/api/login', (req, res) => {
  res.send(200)
})

