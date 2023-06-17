import React from 'react'
import { ParkingCard } from '../components'
import './../css/parking.scss'

const Parking = () => {
    return (
        <div className='container'>
            <h1 className='mt-5'>Search Results</h1>
            <div className='card p-4 mt-5'>
                <div className='row g-3'>
                    <div className='col-md-6'>
                        <input type="text" placeholder='City' className='form-control' />
                    </div>
                    <div className='col-md-3'>
                        <input type="text" placeholder='Price' className='form-control' />
                    </div>
                    <div className='col-md-3'>
                        <button type='submit' className='form-control btn btn-primary'>
                            Search
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search ms-2" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className='row mt-5 g-5'>
                <div className='col-md-4'>
                    <ParkingCard />
                </div>
                <div className='col-md-4'>
                    <ParkingCard />
                </div>
                <div className='col-md-4'>
                    <ParkingCard />
                </div>
                <div className='col-md-4'>
                    <ParkingCard />
                </div>

            </div>
        </div>
    )
}

export default Parking