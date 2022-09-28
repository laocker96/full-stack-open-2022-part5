import { useState } from "react"
import blogsService from "../services/blogs"

const NewBlogForm = ({ setBlogs }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [newBlogError, setNewBlogError] = useState(null)

    const handleNewBlog = (event) => {
        event.preventDefault()
        blogsService.saveBlog({ title, author, url }).then((savedBlog) => {
            setTitle('')
            setAuthor('')
            setUrl('')
            blogsService.getAll().then(blogs =>
                setBlogs(blogs)
            )
        }).catch((error) => {
            setNewBlogError("Can't save new blog")
            setTimeout(() => setNewBlogError(null), 5000)
        })

    }

    return <form onSubmit={handleNewBlog}>
        <div>
            title
            <input type="text" name="Title" value={title} onChange={({ target }) => setTitle(target.value)}></input>
        </div>
        <div>
            author
            <input type="text" name="Author" value={author} onChange={({ target }) => setAuthor(target.value)}></input>
        </div>
        <div>
            url
            <input type="text" name="Url" value={url} onChange={({ target }) => setUrl(target.value)}></input>
        </div>
        <button type="submit">create</button>
        <p style={{ color: "red" }}>{newBlogError}</p>
    </form >
}

export default NewBlogForm