import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { createParking } from '../api/api'
import './../css/createParking.scss'

const ParkingForm = () => {
    const user = useSelector((state) => state.user);

    // Create a form object for storing values
    const [form, setForm] = useState({
        name: '',
        address: '',
        city: '',
        lat: '',
        long: ''
    })

    const [isCreated, setIsCreated] = useState(false)
    const [error, setError] = useState()

    // Handles form values upon change
    const handleFormChange = ({ key, value }) => {
        setForm({ ...form, [key]: value })
    }

    const handleCreateParking = () => {
        setIsCreated(false)
        setError()
        
        const body = { ...form, user_id: user?._id }
        createParking({ body, handleCreateParkingSuccess, handleCreateParkingFailure })
    }

    const handleCreateParkingSuccess = (data) => {
        setIsCreated(true)
    }

    const handleCreateParkingFailure = (error) => {
        setError(error)
    }

    return (
        <div className='container py-5'>
            <div className='card create-parking-card p-5'>
                <h3 className='mb-4'>Create parking</h3>
                {isCreated && <div className="alert alert-success" role="alert">
                    Created successfully!
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
                <button type="submit" className="btn btn-primary mt-4" onClick={handleCreateParking}>Submit</button>
            </div>
        </div>
    )
}

export default ParkingForm