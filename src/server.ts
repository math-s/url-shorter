import express from 'express'

const app = express()

app.listen(3000, () => {
  console.log('listening on port 3000...')
})

app.get('/api/', (req, res) => {
  console.log('GET /api')
  res.send(200)
})

app.post('/api/login', (req, res) => {
  res.send(200)
})
