import { useState } from "react";
import blogsService from "../services/blogs";

const Blog = ({ blog, setBlogs, setNotification }) => {

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

  return (
    <>
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setDetailsVisible(!detailsVisible)}>{!detailsVisible ? 'view' : 'hide'}</button>
      </div>
      {detailsVisible &&
        <div style={blogStyle}>
          <url>{blog.url}</url>
          <div>
            likes {blog.likes}
            <button onClick={() => addLike(blog)}>like</button>
          </div>
          <div>
            {blog.user ? blog.user.name : ''} {/*This is because initial blogs were not created with a user logged in*/}
          </div>
        </div>
      }
    </>
  )
}

export default Blog