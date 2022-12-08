import { useState } from "react";
import PropTypes from 'prop-types'
 
import blogsService from "../services/blogs";


const Blog = ({ user, blog, setBlogs, setNotification }) => {

  const [detailsVisible, setDetailsVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (blog) => {
    blogsService.updateBlog({ ...blog, likes: blog.likes + 1 }).then(() => {
      blogsService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }).catch((error) => {
      setNotification({ message: "Can't add like to blog", class: "error" })
      setTimeout(() => setNotification(null), 5000)
    });
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      blogsService.removeBlog(blog).then(() => {
        setNotification({ message: `Bloggerd removed`, class: "info" })
        setTimeout(() => setNotification(null), 5000)
        blogsService.getAll().then(blogs =>
          setBlogs(blogs)
        )
      }).catch((error) => {
        setNotification({ message: "Can't remove blog", class: "error" })
        setTimeout(() => setNotification(null), 5000)
      });
    }
  }

  return (
    <>
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setDetailsVisible(!detailsVisible)}>{!detailsVisible ? 'view' : 'hide'}</button>
      </div>
      {detailsVisible &&
        <div style={blogStyle}>
          <a href={blog.url}>{blog.url}</a>
          <div>
            likes {blog.likes}
            <button onClick={() => addLike(blog)}>like</button>
          </div>
          <div>
            {blog.user ? blog.user.name : ''} {/*This is because initial blogs were not created with a user logged in*/}
          </div>
          {user.name === blog?.user?.name &&
            <button onClick={() => removeBlog(blog)}>remove</button>
          }
        </div>
      }
    </>
  )
}

Blog.propTypes = {
  user: PropTypes.any.isRequired,
  blog: PropTypes.any.isRequired,
  setBlogs: PropTypes.func.isRequired, 
  setNotification: PropTypes.func.isRequired
}

export default Blog