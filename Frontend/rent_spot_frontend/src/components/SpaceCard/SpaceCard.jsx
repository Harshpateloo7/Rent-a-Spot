import React from 'react'
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SpaceCard = ({ space, onBooking, setSelectedSpace, setShowDeleteModal }) => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()
    const { name, date, price, slot_start_time, slot_end_time, parking_id, is_booked } = space

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate('/spaceForm', { state: { space } })
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        setSelectedSpace(space)
        setShowDeleteModal(true)
    }

    return (
        <div className='card'>
            <div>
                <div className='d-flex justify-content-between'>
                    <h3 className='mt-3 ms-4'>Parking Details</h3>
                    {user?.type !== 'seeker' &&
                        <div className='mt-3 me-4'>
                            <button className='btn btn-outline-warning' onClick={handleEdit}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                </svg>
                            </button>
                            <button className='btn btn-outline-danger ms-2' onClick={handleDelete}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                </svg>
                            </button>
                        </div>}
                </div>
                <div className='px-4 py-2'>
                    <h4>{parking_id?.name}</h4>
                    <span className='mt-5'>Address</span>
                    <p>{parking_id?.address}</p>
                    <span>City</span>
                    <p>{parking_id?.city}</p>
                    <div className='d-flex'>
                        <div>
                            <span>Lat</span>
                            <p>{parking_id?.lat}</p>
                        </div>
                        <div className='ms-3'>
                            <span>Long</span>
                            <p>{parking_id?.long}</p>
                        </div>
                    </div>
                </div>
                <h3 className='mt-3 ms-4'>Space Details</h3>
                <div className='px-4 py-2'>
                    <h4>{name}</h4>
                    <span className='mt-5'>Date</span>
                    <p>{moment.utc(date).format('DD-MM-YYYY')}</p>
                    <span>Price</span>
                    <p>{price}</p>
                    <div className='d-flex'>
                        <div>
                            <span>Start time</span>
                            <p>{slot_start_time}</p>
                        </div>
                        <div className='ms-3'>
                            <span>End time</span>
                            <p>{slot_end_time}</p>
                        </div>
                    </div>
                </div>
            </div>

            {!is_booked ?
                <>
                    <button className='btn btn-outline-primary my-3 mx-3' onClick={onBooking} disabled={user?.type === "owner"}>Book</button>
                    <div className='posted-by px-4 py-2'>
                    </div>
                </>
                :
                <>
                    <button className='btn btn-outline-secondary my-3 mx-3' disabled>Already Booked!</button>
                    <div className='posted-by px-4 py-2'>
                    </div>
                </>}
        </div>
    )
}

export default SpaceCard