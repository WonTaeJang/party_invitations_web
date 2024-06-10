const express = require("express")
const path = require('path')
const bodyParser = require("body-parser")
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/api', (req, res) => {
  return res.json({success: true, value: 'home'})
})

app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

app.listen(5000, () => {
  console.log('app 5000 port start!')
})