import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import blogsService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogsAppUser'))
    setUser(user)
    if (user) {
      blogsService.setToken(user.token)
      blogsService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    setUser(null)
  }

  return (
    <div>
      {!user ?
        <div>
          <h2>log in into application</h2>
          <LoginForm setUser={setUser} />
        </div>
        :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in<button onClick={handleLogout}>log out</button></p>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <h2>create new</h2>
          <NewBlogForm setBlogs={setBlogs} />
        </div>
      }

    </div>
  )
}

export default App
