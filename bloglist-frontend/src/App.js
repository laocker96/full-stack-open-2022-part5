import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import blogsService from './services/blogs'

import './notification.css';
import Notification from './components/Notification'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogsAppUser'))
    setUser(user)
  }, [])

  useEffect(() => {
    if (user) {
      blogsService.setToken(user.token)
      blogsService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    setNotification({ message: `${user.name} logged out.`, class: "info" })
    setUser(null)
    setTimeout(() => setNotification(null), 5000)
  }

  const compareBlogs = (a, b) => {
    return b.likes - a.likes
      ;
  }

  return (
    <div>
      {!user ?
        <div>
          <h2>log in into application</h2>
          <Notification notification={notification} />
          <LoginForm setUser={setUser} setNotification={setNotification} />
        </div>
        :
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>{user.name} logged in<button onClick={handleLogout}>log out</button></p>
          <Toggable buttonLabel={"create new blog"} >{
            (toggleVisibility) => (
              <NewBlogForm setBlogs={setBlogs} setNotification={setNotification} toggleVisibility={toggleVisibility} />
            )
          }
          </Toggable>
          {blogs.sort(compareBlogs).map(blog =>
            <Blog key={blog.id} user={user} blog={blog} setBlogs={setBlogs} setNotification={setNotification} />
          )}
        </div>
      }

    </div>
  )
}

export default App
