import { useState } from "react"
import loginService from "../services/login"
import blogsService from "../services/blogs"

const LoginForm = ({ setUser }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault()

        loginService.authenticate({ username, password }).then((user) => {
            blogsService.setToken(user.token)
            setUser(user) 
            setUsername('')
            setPassword('')
        }).catch((error) => {
            console.log(error);
            setLoginError('Wrong credentials')
            setTimeout(() => {
                setLoginError(null)
            }, 5000)
        })
    }

    return <form onSubmit={handleLogin}>
        <div>
            username
            <input type="text" name="Username" value={username} onChange={({target}) => setUsername(target.value)}></input>
        </div>
        <div>
            password
            <input type="password" name="Password" value={password} onChange={({target}) => setPassword(target.value)}></input>
        </div>
        <button type="submit">login</button>
        <p style={{ color: "red" }}>{loginError}</p>
    </form>

}

export default LoginForm