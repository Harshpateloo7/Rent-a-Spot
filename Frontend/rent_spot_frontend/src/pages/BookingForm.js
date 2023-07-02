import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createBooking, fetchSpaces } from '../api/api'
import './../css/createParking.scss'

const BookingForm = () => {
    const { state } = useLocation();
    const user = useSelector((state) => state.user);
    const [space, setSpace] = useState('');

    // Create a form object for storing values
    const [form, setForm] = useState({
        vehicle_company: '',
        vehicle_model: '',
        plate_number: '',
        car_color: '',
        space_id: '',
    })

    const [isCreated, setIsCreated] = useState(false)
    const [error, setError] = useState()

    // Handles form values upon change
    const handleFormChange = ({ key, value }) => {
        setForm({ ...form, [key]: value })
    }

    const handleCreateBooking = () => {
        setIsCreated(false)
        setError()

        const body = { ...form, user_id: user?._id }
        createBooking({ body, handleCreateBookingSuccess, handleCreateBookingFailure })
    }

    const handleCreateBookingSuccess = (data) => {
        setIsCreated(true)
    }

    const handleCreateBookingFailure = (error) => {
        setError(error)
    }

    const [spaces, setSpaces] = useState()

    useEffect(() => {
        // Space List API sets spaces state using setSpaces passed as callback function
        fetchSpaces({ setSpaces })

        setSpace(state?.space)

        handleFormChange({ key: 'space_id', value: state?.space?._id })
    }, [state])

    console.log('space ', space);

    return (
        <div className='container py-5'>
            <div className='card create-parking-card p-5'>
                <h3 className='mb-4'>Make booking</h3>
                {isCreated && <div className="alert alert-success" role="alert">
                    Booked successfully!
                </div>}
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                <div className="mb-3">
                    <label htmlFor="vehicle_company" className="form-label">Vehicle company</label>
                    <input type="text" className="form-control" id="vehicle_company" value={form?.vehicle_company} onChange={(e) => handleFormChange({ key: 'vehicle_company', value: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="vehicle_model" className="form-label">Vehicle model</label>
                    <input type="text" className="form-control" id="vehicle_model" value={form?.vehicle_model} onChange={(e) => handleFormChange({ key: 'vehicle_model', value: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="plate_number" className="form-label">Plate number</label>
                    <input type="text" className="form-control" id="plate_number" value={form?.plate_number} onChange={(e) => handleFormChange({ key: 'plate_number', value: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="car_color" className="form-label">Car color</label>
                    <input type="text" className="form-control" id="car_color" value={form?.car_color} onChange={(e) => handleFormChange({ key: 'car_color', value: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="space" className="form-label">Space</label>
                    <select className="form-select" value={form?.space_id} onChange={(e) => handleFormChange({ key: 'space_id', value: e.target.value })} disabled>
                        <option value="">Select</option>
                        {spaces?.map((item) => (
                            <option value={item?._id}>{item?.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="space" className="form-label">Space details</label>
                    <p><strong>Date: </strong>{moment.utc(space?.date).format('DD-MM-YYYY')}</p>
                    <p><strong>Start time: </strong>{space?.slot_start_time}</p>
                    <p><strong>End time: </strong>{space?.slot_end_time}</p>
                    <p><strong>Price: </strong>{space?.price}</p>
                    <p><strong>Address: </strong>{space?.parking_id?.address}</p>
                    <p><strong>City: </strong>{space?.parking_id?.city}</p>
                </div>
                <button type="submit" className="btn btn-primary mt-4" onClick={handleCreateBooking}>Submit</button>
            </div>
        </div>
    )
}

export default BookingForm