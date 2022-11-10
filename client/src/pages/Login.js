import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [username, setUSername] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(password, username)
    }

    return (
        <div className="container">
            <div className="container-left">
                <div className="grad1"></div>
                <p className="to-do-list">TO DO LIST</p>
                <img alt="" className="card-to-do"/>
            </div>
            <div className="container-right">

            </div>

            <div className="login-box">
                <p className="container-right-p">Welcome to To Do List</p>
                <form onSubmit={handleSubmit}>
                    <label className="label">Username:</label>
                    <input className="input"
                        type="text"
                        onChange={(e) => setUSername(e.target.value)}
                        value={username}
                    />

                    <label className="label">Password:</label>
                    <input className="input"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <button disabled={isLoading} className='login-button' type="submit">Login</button>
                    {error && <div className='error'>{error}</div>}
                </form>
           </div>
        </div>

    )
}

export default Login