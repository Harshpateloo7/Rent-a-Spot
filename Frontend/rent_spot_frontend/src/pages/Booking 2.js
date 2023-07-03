import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchBookings } from '../api/api'

const Booking = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState()

    // Used to display multiple Booking cards
    const bookingsRow = () => {
        return bookings && bookings.map((item, index) => (
            <tr className='col-md-4' key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item?.vehicle_company}</td>
                <td>{item?.vehicle_model}</td>
                <td>{item?.plate_number}</td>
                <td>{item?.car_color}</td>
                <td>{item?.space_id?.name}</td>
                <td>{moment(item?.space_id?.date).utc().format('DD-MM-YYYY')}</td>
                <td>{item?.space_id?.slot_start_time}</td>
                <td>{item?.space_id?.slot_end_time}</td>
                <td>{moment(item?.createdAt).utc().format('DD-MM-YYYY / hh:mm a')}</td>
            </tr>
        ))
    }

    useEffect(() => {
        // Booking List API sets parkings state using setBookings passed as callback function
        fetchBookings({ user_id: user?._id, setBookings })
    }, [])


    return (
        <div className='container'>
            <h1 className='mt-5'>My Bookings</h1>

            <div className='row mt-2 g-5'>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Vehicle company</th>
                            <th scope="col">Vehicle model</th>
                            <th scope="col">Plate number</th>
                            <th scope="col">Car color</th>
                            <th scope="col">Space</th>
                            <th scope="col">Space Date</th>
                            <th scope="col">Slot start time</th>
                            <th scope="col">Slot end time</th>
                            <th scope="col">Booking time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings?.length > 0 ?
                            bookingsRow()
                            :
                            <tr className='col-md-4 text-center'>
                                <td colSpan={10}><em>No bookings found</em></td>
                            </tr>}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Booking