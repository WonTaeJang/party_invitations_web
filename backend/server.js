const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cors = require("cors")
const axios = require('axios')
const {MongoClient, ObjectId} = require('mongodb')
const dayjs = require('dayjs')

const app = express()
require('dotenv').config()

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// MongoDB connection URI
const uri = process.env.MONGO_DB_URI

let dbClient

MongoClient.connect(uri).then(client => {
  console.log('Connected to MongoDB')
  dbClient = client
})
.catch(err => console.error('Error connecting to MongoDB', err))

app.get('/api/data', async (req, res) => {
  try {
    const database = dbClient.db('sample_mflix')
    const collection = database.collection('users')

    // Perform find operation
    const data = await collection.find({ name: { $regex: 'John', $options: 'i' } }).toArray()
    res.json(data)
  } catch (err) {
    console.error('Error fetching data', err)
    res.status(500).json({ message: 'Error fetching data' })
  }
})

/**
 * 초대 API
 * */ 
// 참가자 리스트
app.get('/api/participants', async (req, res) => {
  try {
    const database = dbClient.db('party_db')
    const collection = database.collection('participant')

    // Perform find operation
    const data = await collection.find().toArray()
    // console.log(data)
    res.json(data.map(el => {
      return {
        name: el.name,
        comments: el.comments,
      }
    }))
  } catch (err) {
    console.error('Error fetching data', err)
    res.status(500).json({ message: 'Error fetching data' })
  }
})

app.get('/api/admin/participants', async (req, res) => {
  try {
    const database = dbClient.db('party_db')
    const collection = database.collection('participant')

    // Perform find operation
    const data = await collection.find().toArray()
    // console.log(data)
    res.json(data)
  } catch (err) {
    console.error('Error fetching data', err)
    res.status(500).json({ message: 'Error fetching data' })
  }
})

// 참가 확인
app.post('/api/participant/find', async (req, res) => {
  const { name, phone_number } = req.body

  try {
    const database = dbClient.db('party_db')
    const collection = database.collection('participant')

    const data = await collection.findOne({name: name, phone_number: phone_number})

    res.status(200).json(data)
  } catch (err) {
    console.error('Error find data', err)
    res.status(500).json({ 
      message: 'Error find data' 
    })
  }
})

// 로그인
app.post('/api/login', (req, res) => {
  const { password } = req.body

  if(password.toString().length === 4) {
    if(password.toString() === process.env.ADMIN_PASSWORD.toString()) {
      res.status(200).json({ message: 'Login' })
    } else {
      res.status(400).json({ error: 'Password Error' })
    }
  } else {
    res.status(400).json({ error: 'Password Error' })
  }
})

// 참가 취소
app.delete('/api/participant/delete', async (req, res) => {
  const { id } = req.body

  try {
    const database = dbClient.db('party_db')
    const collection = database.collection('participant')
    
    // { acknowledged: true, deletedCount: 0 }
    const data = await collection.deleteOne({ _id: new ObjectId(id) })

    if(data.deletedCount > 0) {
      res.status(200).json({
        message: 'Deleted',
        delete: true
      })
    } else {
      res.status(200).json({
        message: 'No Contents',
        delete: false
      })
    }

    
  } catch (err) {
    console.error('Error delete data', err)
    res.status(500).json({ message: 'Error delete data' })
  }
})

// 참가 신청
app.post('/api/participant', async (req, res) => {
  const { name, phone_number, comments, check_event, number_of_participant } = req.body

  // 이름, 전화번호 필수
  if(!name || !phone_number) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  try {
    const database = dbClient.db('party_db')
    const collection = database.collection('participant')

    // 기간이 지나면 
    let expiredDate = dayjs(process.env.EXPIRED_DATE)

    if(expiredDate.diff(dayjs().format()) < 0) {
      return res.status(400).json({ 
        code: 'req-error-expired',
        error: "The application period has ended."
      })
    }

    // 중독 체크
    const data = await collection.find({name: name, phone_number: phone_number}).toArray()

    // 이미 존재할때
    if(data.length > 0) {
      return res.status(400).json({ 
        code: 'req-error-already',
        error: 'Already participant user' 
      })
    }

    await collection.insertOne({
      name: name,
      phone_number: phone_number,
      comments: comments,
      check_event: check_event, // 파티참가 플래그
      number_of_participant: number_of_participant, // default 1
    })

    res.status(201).json({message: 'Insert Success'})
  } catch (err) {
    console.error('Error fetching data', err)
    res.status(500).json({ 
      code: 'req-error',
      message: 'Error fetching data' 
    })
  }
})

// update 
app.put('/api/participant', async (req, res) => {
  const { id, check_event, number_of_participant, hidden_comments } = req.body
  console.log(req.body)

  try {
    const database = dbClient.db('party_db')
    const collection = database.collection('participant')

    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          check_event: check_event,
          number_of_participant: number_of_participant,
          hidden_comments: hidden_comments
        }
      }
    )

    res.status(200).json({
      message: 'Updated',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ 
      message: 'Error update data' 
    })
  }
})

/**
 * frontend 
 * */ 
app.use(express.static(path.join(__dirname, "../frontend")))
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"))
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"))
})

app.listen(process.env.SERVER_PORT, () => {
  console.log("app 5000 port start!")
})
