
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const bookSchema = new mongoose.Schema({
  title: String,
  author: String
})

const Book = mongoose.model('Book', bookSchema)

app.get('/books', async (req, res) => {
  const books = await Book.find()
  res.json(books)
})

app.post('/books', async (req, res) => {
  const book = await Book.create(req.body)
  res.status(201).json(book)
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(5000, () => {
      console.log('Server running on port 5000')
    })
  })
  .catch(error => console.log(error))
