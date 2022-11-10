import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [username, setUSername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(username, password, email)
        await signup(email, password, username, name, phone_number)

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

            <div className="signup-box">
                <p className="container-right-p">Welcome to To Do List</p>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />

                    <label>Phone Number:</label>
                    <input
                        type="text"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phone_number}
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <label>Username:</label>
                    <input
                        type="text"
                        onChange={(e) => setUSername(e.target.value)}
                        value={username}
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <button className='signup-button' disabled={isLoading}>Sign up</button>
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>
        </div>

    )
}

export default Signup