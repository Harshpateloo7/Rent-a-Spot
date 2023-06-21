import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../api/api'
import './../css/auth.scss'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('')

    const [isRegistered, setIsRegistered] = useState(false)

    const handleRegister = () => {
        console.log('name ', name);
        console.log('email ', email);
        if (register({ name, email, password, type })) {
            setIsRegistered(true)
        }
    }

    return (
        <div className='auth-container'>
            <div className='card login-card m-auto p-5'>
                <h3 className='mb-4'>Sign up</h3>
                {isRegistered && <div class="alert alert-success" role="alert">
                    Registration successful!
                </div>}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Type</label>
                    <select className="form-select" value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="">Select</option>
                        <option value="owner">Owner</option>
                        <option value="seeker">Seeker</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-outline-primary mt-3" onClick={() => handleRegister()}>Submit</button>
            </div>
        </div>
    )
}

export default Register