import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { resetPassword } from '../api/api'
import './../css/createParking.scss'

const Profile = () => {
    const user = useSelector((state) => state.user);

    // Create a form object for storing values
    const [form, setForm] = useState({
        password: '',
    })

    const [isUpdated, setIsUpdated] = useState(false)
    const [error, setError] = useState()

    // Handles form values upon change
    const handleFormChange = ({ key, value }) => {
        setForm({ ...form, [key]: value })
    }

    const handleResetPassword = () => {
        setIsUpdated(false)
        setError()
        
        const body = { ...form, user_id: user?._id }
        resetPassword({ body, handleResetPasswordSuccess, handleResetPasswordFailure })
    }

    const handleResetPasswordSuccess = (data) => {
        setIsUpdated(true)
    }

    const handleResetPasswordFailure = (error) => {
        setError(error)
    }

    return (
        <div className='container py-5'>
            <div className='card create-parking-card p-5'>
                <h3 className='mb-4'>Manage Profile</h3>
                {isUpdated && <div className="alert alert-success" role="alert">
                    Updated successfully!
                </div>}
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={form?.name} disabled/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" value={form?.email} disabled/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={form?.password} onChange={(e) => handleFormChange({ key: 'password', value: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Type</label>
                    <input type="text" className="form-control" id="type" value={form?.type} disabled/>
                </div>
                <button type="submit" className="btn btn-primary mt-4" onClick={handleResetPassword}>Submit</button>
            </div>
        </div>
    )
}

export default Profile