import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser, setNotification }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        loginService.authenticate({ username, password }).then((user) => {
            window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
            setNotification({ message: `Welcome back ${user.name}`, class: 'info' })
            setTimeout(() => setNotification(null), 5000)
        }).catch(() => {
            setNotification({ message: 'Wrong credentials', class: 'error' })
            setTimeout(() => setNotification(null), 5000)
        })
    }

    return <form onSubmit={handleLogin}>
        <div>
            username
            <input type="text" name="Username" value={username} onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
            password
            <input type="password" name="Password" value={password} onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button type="submit">login</button>
    </form>

}

export default LoginForm