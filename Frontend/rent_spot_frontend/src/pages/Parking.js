import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchParkings } from '../api/api'
import { ParkingCard } from '../components'
import './../css/parking.scss'

const Parking = () => {
    const navigate = useNavigate()
    const [parkings, setParkings] = useState()

    useEffect(() => {
        // Parking List API sets parkings state using setParkings passed as callback function
        fetchParkings(setParkings)
    }, [])

    // Used to display multiple Parking cards
    const parkingCards = () => {
        return parkings && parkings.map((item, index) => (
            <div className='col-md-4' key={index}>
                <ParkingCard parking={item} onClick={() => navigate('/space', { state: { parking: item } })} />
            </div>
        ))
    }

    return (
        <div className='container'>
            <h1 className='mt-5'>Parkings</h1>

            <div className='row mt-2 g-5'>
                {parkingCards()}
            </div>
        </div>
    )
}

export default Parking