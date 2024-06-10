const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cors = require("cors")
// const db = require('./db')

const app = express()

app.use(bodyParser.json())
app.use(cors())

// app.use('/react', express.static(__dirname + '/frontend'))
// app.use(express.static(path.join(__dirname, '../')))

// db.pool.query(`CREATE TABLE lists (
//   id INTEGER AUTO_INCREMENT,
//   value TEXT,
//   PRIMARY KEY (id)
// )`, (err, results, fileds) => {
//   console.log('results', results)
// })

// app.get('/api/values', function(req, res) {
//   db.pool.query('SELECT * FROM lists;', (err, results, fileds) => {
//     if(err)
//       return res.status(500).send(err)
//     else
//       return res.json(results)
//   })

// })

// app.post('/api/value', function(req, res, next) {
//   db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (err, results, fileds) => {
//     if(err)
//       return res.status(500).send(err)
//     else
//       return res.json({success: true, value: req.body.value})
//   })
// })

// app.get('/', (req, res) => {
//   return res.json({success: true, value: 'home'})
// })

app.get("/api/test", (req, res) => {
  return res.json({
    test: "this is api test",
    time: new Date(),
  })
})

app.get("/start", (req, res) => {
  return res.json({ success: true, value: "hello world" })
})

app.use(express.static(path.join(__dirname, "../frontend")))
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"))
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"))
})

app.listen(5000, () => {
  console.log("app 5000 port start!")
})
