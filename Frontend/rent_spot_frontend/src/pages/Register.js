import React from 'react'
import './../css/auth.scss'

const Register = () => {
    return (
        <div className='auth-container'>
            <div className='card login-card m-auto p-5'>
                <h3 className='mb-4'>Sign up</h3>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Type</label>
                    <select class="form-select">
                        <option selected>Select</option>
                        <option value="owner">Owner</option>
                        <option value="seeker">Seeker</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-outline-primary mt-3">Submit</button>
            </div>
        </div>
    )
}

export default Register