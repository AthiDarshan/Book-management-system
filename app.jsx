
import { useState, useEffect } from 'react'
import './App.css'

function BookCard({ title, author }) {
  return (
    <div className="book-card">
      <h3>{title}</h3>
      <p>Author: {author}</p>
    </div>
  )
}

function App() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    alert('Welcome to the Book Management System')
    fetchBooks()
  }, [])

  useEffect(() => {
    setNotification(`Total books: ${books.length}`)
  }, [books.length])

  const fetchBooks = async () => {
    const response = await fetch('/api/books')
    const data = await response.json()
    setBooks(data)
  }

  const addBook = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, author })
    })

    if (response.ok) {
      setTitle('')
      setAuthor('')
      fetchBooks()
    } else {
      alert('Book could not be added')
    }
  }

  return (
    <div className="container">
      <h1>Book Management System</h1>

      <h2>Add Book Details</h2>

      <form onSubmit={addBook}>
        <input
          placeholder="Enter Book Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Enter Author Name"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />

        <button type="submit">Add Book</button>
      </form>

      <p>{notification}</p>

      <h2>
        {books.length > 0 ? 'Books Available' : 'No Books Available'}
      </h2>

      {books.map(book => (
        <BookCard
          key={book._id}
          title={book.title}
          author={book.author}
        />
      ))}
    </div>
  )
}

export default App
