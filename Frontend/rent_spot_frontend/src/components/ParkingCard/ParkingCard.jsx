import React from 'react'
import './styles.scss'

const ParkingCard = ({parking}) => {
    const { name, address, city, lat, long, user_id } = parking

    return (
        <div className='card'>
            <div className='px-4 py-4'>
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
            <div className='posted-by px-4 py-2'>
                <p>Posted by <span>{user_id?.name}</span></p>
            </div>
        </div>
    )
}

export default ParkingCard