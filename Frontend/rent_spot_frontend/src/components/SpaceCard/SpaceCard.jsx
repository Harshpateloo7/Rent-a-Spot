import React from 'react'
// import './styles.scss'
import moment from "moment";

const SpaceCard = ({ space, onBooking }) => {
    const { name, date, price, slot_start_time, slot_end_time, parking_id, is_booked } = space

    return (
        <div className='card'>
            <h3 className='mt-3 ms-4'>Parking Details</h3>
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
                <p>{moment(date).utc().format('DD-MM-YYYY')}</p>
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
            {!is_booked ?
                <>
                    <button className='btn btn-outline-primary my-3 mx-3' onClick={onBooking}>Book</button>
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