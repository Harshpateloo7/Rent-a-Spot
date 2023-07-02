import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteParking, fetchParkings } from '../api/api'
import { DeleteModal, ParkingCard } from '../components'
import './../css/parking.scss'

const Parking = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()
    const [parkings, setParkings] = useState()

    // Delete management states
    const [selectedParking, setSelectedParking] = useState()
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        // Parking List API sets parkings state using setParkings passed as callback function
        if (user?.type === 'owner') {
            fetchParkings({ user_id: user?._id, setParkings })
        }
        else {
            fetchParkings({ setParkings })
        }
    }, [])

    // Used to display multiple Parking cards
    const parkingCards = () => {
        return parkings && parkings.map((item, index) => (
            <div className='col-md-4' key={index}>
                <ParkingCard
                    parking={item}
                    onClick={() => navigate('/space', { state: { parking: item } })}
                    setSelectedParking={setSelectedParking}
                    setShowDeleteModal={setShowDeleteModal} />
            </div>
        ))
    }

    // Used to delete parking
    const handleDeleteParking = () => {
        deleteParking({ id: selectedParking?._id, handleDeleteParkingSuccess, handleDeleteParkingFailure })
    }

    const handleDeleteParkingSuccess = () => {
        if (user?.type === 'owner') {
            fetchParkings({ user_id: user?._id, setParkings })
        }
        else {
            fetchParkings({ setParkings })
        }
        setShowDeleteModal(false)
    }

    const handleDeleteParkingFailure = () => {
        setShowDeleteModal(false)
    }

    return (
        <div className='container'>
            <h1 className='mt-5'>Parkings</h1>

            <div className='row mt-2 g-5'>
                {parkingCards()}
            </div>
            <DeleteModal value={selectedParking?.name} showModal={showDeleteModal} setShowModal={setShowDeleteModal} onDeleteConfirm={handleDeleteParking}/>
        </div>
    )
}

export default Parking