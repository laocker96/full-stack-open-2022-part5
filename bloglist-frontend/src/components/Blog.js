import { useState } from "react";

const Blog = ({ blog }) => {

  const [detailsVisible, setDetailsVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
            likes{blog.likes}
            <button>like</button>
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