import { useState } from 'react'
import blogsService from '../services/blogs'

const NewBlogForm = ({ setBlogs, setNotification, toggleVisibility }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = (event) => {
        event.preventDefault()
        blogsService.saveBlog({ title, author, url }).then((savedBlog) => {
            setTitle('')
            setAuthor('')
            setUrl('')
            toggleVisibility(false)
            setNotification({ message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`, class: 'info' })
            setTimeout(() => setNotification(null), 5000)
            blogsService.getAll().then(blogs =>
                setBlogs(blogs)
            )
        }).catch(() => {
            setNotification({ message: 'Can\'t save new blog', class: 'error' })
            setTimeout(() => setNotification(null), 5000)
        })

    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleNewBlog}>
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
            </form >
        </>
    )
}

export default NewBlogForm