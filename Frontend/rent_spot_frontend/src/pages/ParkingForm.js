import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createParking, updateParking } from '../api/api'
import './../css/createParking.scss'

const ParkingForm = () => {
    const { state } = useLocation()
    const user = useSelector((state) => state.user);

    // Create a form object for storing values
    const [form, setForm] = useState({
        name: '',
        address: '',
        city: '',
        lat: '',
        long: ''
    })

    const [successMessage, setSuccessMessage] = useState()
    const [error, setError] = useState()

    // Handles form values upon change
    const handleFormChange = ({ key, value }) => {
        setForm({ ...form, [key]: value })
    }

    // Create new parking API
    const handleCreateParking = () => {
        setSuccessMessage()
        setError()

        const body = { ...form, user_id: user?._id }
        createParking({ body, handleCreateParkingSuccess, handleCreateParkingFailure })
    }

    const handleCreateParkingSuccess = (data) => {
        setSuccessMessage('Created successfully!')
    }

    const handleCreateParkingFailure = (error) => {
        setError(error)
    }

    // Edit parking API
    const handleUpdateParking = () => {
        setSuccessMessage()
        setError()

        const body = { ...form }
        updateParking({ id: state?.parking?._id, body, handleUpdateParkingSuccess, handleUpdateParkingFailure })
    }

    const handleUpdateParkingSuccess = (data) => {
        setSuccessMessage('Updated successfully!')
    }

    const handleUpdateParkingFailure = (error) => {
        setError(error)
    }

    const handleSubmit = () => {
        if (state?.parking) {
            handleUpdateParking()
        }
        else {
            handleCreateParking()
        }
    }

    useEffect(() => {
        setForm({
            name: state?.parking?.name,
            address: state?.parking?.address,
            city: state?.parking?.city,
            lat: state?.parking?.lat,
            long: state?.parking?.long
        })
    }, [state])

    return (
        <div className='container py-5'>
            <div className='card create-parking-card p-5'>
                <h3 className='mb-4'>{state?.parking ? 'Update': 'Create'} parking</h3>
                {successMessage && <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>}
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={form?.name} onChange={(e) => handleFormChange({ key: 'name', value: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea rows={2} type="text" className="form-control" id="address" value={form?.address} onChange={(e) => handleFormChange({ key: 'address', value: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" value={form?.city} onChange={(e) => handleFormChange({ key: 'city', value: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lat" className="form-label">Lat</label>
                    <input type="number" className="form-control" id="lat" value={form?.lat} onChange={(e) => handleFormChange({ key: 'lat', value: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="long" className="form-label">Long</label>
                    <input type="number" className="form-control" id="long" value={form?.long} onChange={(e) => handleFormChange({ key: 'long', value: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary mt-4" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default ParkingForm