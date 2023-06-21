import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/api'
import './../css/auth.scss'

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        console.log('email ', email);
        console.log('password ', password);

        if (login({ email, password })) {
            navigate('/')
        }
    }

    return (
        <div className='container-fluid auth-container'>
            <div className='card login-card m-auto p-5'>
                <h3 className='mb-4'>Sign in</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input type="password" className="form-control" id="pass" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='d-flex justify-content-between'>
                    Are you a new user?<Link to='/register'>Create account</Link>
                </div>
                <button type="submit" className="btn btn-outline-primary mt-3" onClick={() => handleLogin()}>Submit</button>
            </div>
        </div>
    )
}

export default Login