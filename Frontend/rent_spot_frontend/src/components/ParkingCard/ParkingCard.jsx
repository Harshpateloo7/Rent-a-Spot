import React from 'react'
import './styles.scss'

const ParkingCard = (props) => {
    return (
        <div className='card'>
            <div className='px-4 py-4'>
                <h4>Zendaya's Parking</h4>
                <span className='mt-5'>Address</span>
                <p>615 Sactona Road, Toronto, ON</p>
                <span>City</span>
                <p>Toronto</p>
                <div className='d-flex'>
                    <div>
                        <span>Lat</span>
                        <p>98.5</p>
                    </div>
                    <div className='ms-3'>
                        <span>Long</span>
                        <p>102.3</p>
                    </div>
                </div>
            </div>
            <div className='posted-by px-4 py-2'>
                <p>Posted by <span>Harsh</span></p>
            </div>
        </div>
    )
}

export default ParkingCard