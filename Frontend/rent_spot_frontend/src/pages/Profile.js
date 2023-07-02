import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, updateUser } from '../api/api'
import { setUser } from '../reducers/userReducer';
import './../css/createParking.scss'

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    // Create a form object for storing values
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        type: '',
        cash: false,
        interac: ''
    })

    const [isUpdated, setIsUpdated] = useState(false)
    const [error, setError] = useState()

    // Handles form values upon change
    const handleFormChange = ({ key, value }) => {
        setForm({ ...form, [key]: value })
    }

    const handleUpdateUserPassword = () => {
        setIsUpdated(false)
        setError()

        const body = { cash: form.cash, interac: form.interac }
        updateUser({ user_id: user?._id, body, handleUpdateUserSuccess, handleUpdateUserFailure })
    }

    const handleUpdateUserSuccess = (data) => {
        dispatch(setUser({ ...user, ...data?.user }));
        setIsUpdated(true)
    }

    const handleUpdateUserFailure = (error) => {
        setError(error)
    }

    const handleResetPassword = () => {
        setIsUpdated(false)
        setError()
        console.log('form?.password ', form?.password);
        console.log('form?.confirmPassword ', form?.confirmPassword);
        if (form?.password !== form?.confirmPassword) {
            setError('New password and confirm password should be same')
        }
        else {
            const body = { password: form.password, cash: form.cash, interac: form.interac }
            resetPassword({ user_id: user?._id, body, handleResetPasswordSuccess, handleResetPasswordFailure })
        }
    }

    const handleResetPasswordSuccess = (data) => {
        setIsUpdated(true)
    }

    const handleResetPasswordFailure = (error) => {
        setError(error)
    }

    useEffect(() => {
        setForm({
            name: user?.name,
            email: user?.email,
            type: user?.type,
            cash: user?.cash,
            interac: user?.interac
        })
    }, [user])

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
                    <input type="text" className="form-control" id="name" value={form?.name} disabled />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" value={form?.email} disabled />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Type</label>
                    <input type="text" className="form-control" id="type" value={form?.type} disabled />
                </div>

                {user?.type === 'owner' &&
                    <>
                        <div className="mb-3 d-flex justify-content-between">
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Accepts cash
                            </label>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={form?.cash} onChange={(e) => handleFormChange({ key: 'cash', value: e.target.checked })} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="interac" className="form-label">Interac</label>
                            <input type="text" className="form-control" id="interac" value={form?.interac} onChange={(e) => handleFormChange({ key: 'interac', value: e.target.value })} />
                        </div>
                    </>}

                <button type="submit" className="btn btn-primary mt-4 mb-4" onClick={handleUpdateUserPassword}>Update</button>

                <h3 className='mt-3'>Change password</h3>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="password" value={form?.password} onChange={(e) => handleFormChange({ key: 'password', value: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="confirmPassword" className="form-control" id="confirmPassword" value={form?.confirmPassword} onChange={(e) => handleFormChange({ key: 'confirmPassword', value: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary mt-4" onClick={handleResetPassword}>Change Password</button>
            </div>
        </div>
    )
}

export default Profile