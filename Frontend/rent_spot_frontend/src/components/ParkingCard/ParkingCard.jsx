import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.scss'
import StarRating from '../StarRating/StarRating'
import { useSelector } from 'react-redux'

const ParkingCard = ({ parking, onClick, setSelectedParking, setShowDeleteModal }) => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()
    const { name, address, city, lat, long, user_id, owner_rating } = parking

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate('/parkingForm', { state: { parking } })
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        setSelectedParking(parking)
        setShowDeleteModal(true)
    }

    const handleRatingClick = (e) => {
        e.stopPropagation();
        navigate('/review', { state: { owner_id: user_id?._id } })
    }

    return (
        <div className='card' onClick={onClick}>
            <div className='px-4 py-4 d-flex justify-content-between'>
                <div>
                    <h4>{name}</h4>
                    <span className='mt-5'>Address</span>
                    <p>{address}</p>
                    <span>City</span>
                    <p>{city}</p>
                    <div className='d-flex'>
                        <div>
                            <span>Lat</span>
                            <p>{lat}</p>
                        </div>
                        <div className='ms-3'>
                            <span>Long</span>
                            <p>{long}</p>
                        </div>
                    </div>
                </div>
                <div>
                    {user?.type !== 'seeker' &&
                        <>
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
                        </>}
                </div>
            </div>
            <div className='posted-by px-4 py-2'>
                <p>Posted by <span>{user_id?.name}</span></p>
                <div onClick={handleRatingClick}><StarRating value={owner_rating} readonly /></div>
            </div>
        </div>
    )
}

export default ParkingCard