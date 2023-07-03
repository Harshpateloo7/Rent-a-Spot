import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { createSpace, fetchParkings, fetchSpaces } from '../api/api'
import './../css/createParking.scss'

const SpaceForm = () => {
    const user = useSelector((state) => state.user);

    // Create a form object for storing values
    const [form, setForm] = useState({
        name: '',
        date: '',
        slot_start_time: '',
        slot_end_time: '',
        price: '',
        parking_id: '',
    })

    const [isCreated, setIsCreated] = useState(false)
    const [error, setError] = useState()

    const time = ['12:00am', '2:00am', '4:00am', '6:00am', '8:00am', '10:00am',
        '12:00pm', '2:00pm', '4:00pm', '6:00pm', '8:00pm', '10:00pm']

    // Handles form values upon change
    const handleFormChange = ({ key, value }) => {
        setForm({ ...form, [key]: value })
    }

    const handleCreateSpace = () => {
        setIsCreated(false)
        setError()

        const body = { ...form, user_id: user?._id }
        createSpace({ body, handleCreateSpaceSuccess, handleCreateSpaceFailure })
    }

    const handleCreateSpaceSuccess = (data) => {
        setIsCreated(true)
    }

    const handleCreateSpaceFailure = (error) => {
        setError(error)
    }

    const [spaces, setSpaces] = useState()

    useEffect(() => {
        // Space List API sets spaces state using setSpaces passed as callback function
        fetchSpaces({ setSpaces })
    }, [])



    return (
        <div className='container py-5'>
            <div className='card create-parking-card p-5'>
                <h3 className='mb-4'>Create space</h3>
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
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" value={form?.date} onChange={(e) => handleFormChange({ key: 'date', value: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="slot_start_time" className="form-label">Slot start time</label>
                    <select className="form-select" value={form?.slot_start_time} onChange={(e) => handleFormChange({ key: 'slot_start_time', value: e.target.value })} >
                        <option value="">Slot start time</option>
                        {time?.map((item) => (
                            <option value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="slot_end_time" className="form-label">Slot end time</label>
                    <select className="form-select" value={form?.slot_end_time} onChange={(e) => handleFormChange({ key: 'slot_end_time', value: e.target.value })} >
                        <option value="">Select</option>
                        {time?.map((item) => (
                            <option value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text" className="form-control" id="price" value={form?.price} onChange={(e) => handleFormChange({ key: 'price', value: e.target.value })} />
                </div>

                <div className="mb-3">
                    <label htmlFor="parking" className="form-label">Parking</label>
                    <select className="form-select" value={form?.parking_id} onChange={(e) => handleFormChange({ key: 'parking_id', value: e.target.value })} >
                        <option value="">Select</option>
                        {spaces?.map((item) => (
                            <option value={item?._id}>{item?.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-4" onClick={handleCreateSpace}>Submit</button>
            </div>
        </div>
    )
}

export default SpaceForm