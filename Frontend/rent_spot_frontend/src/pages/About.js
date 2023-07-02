import React from 'react'
import './../css/about.scss'

const About = () => {
    return (
        <div>
            <div className='overlay'>
                <h1>About</h1>
            </div>
            <div className='container'>
                <div className='row py-5 my-5'>
                    <h2 className='mb-3'>About Rent A Spot</h2>
                    <p>Rent a Spot aims to establish a platform that connects parking owners within the community with users in search of affordable parking spaces. Our web application assists parking owners in effectively renting out their additional parking spaces, providing them with an opportunity to earn extra income. Additionally, rent a Spot facilitates users in finding cost-effective parking spaces.</p>
                </div>

                <div className='row mt-5 mb-5'>
                    <div className='col-md-6'>
                        <img src='./seeker.jpg' className='services-img'></img>
                    </div>
                    <div className='col-md-6 d-flex align-items-center'>
                        <div>
                            <h3>Parking Seekers</h3>
                            <p>Parking Seekers can utilize the Rent a Spot web application to search for available parking spots that meet their specific needs. By selecting a suitable parking spot, users can reserve it by making the desired payment. Once the reservation is confirmed, users can park their cars by following the provided instructions. Our user-friendly platform ensures a seamless and convenient experience for Parking Seekers, allowing them to easily find and secure parking spaces that suit their requirements.</p>
                        </div>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className='col-md-6 d-flex align-items-center'>
                        <div className='text-right'>
                            <h3>Parking Seekers</h3>
                            <p>Parking Seekers can utilize the Rent a Spot web application to search for available parking spots that meet their specific needs. By selecting a suitable parking spot, users can reserve it by making the desired payment. Once the reservation is confirmed, users can park their cars by following the provided instructions. Our user-friendly platform ensures a seamless and convenient experience for Parking Seekers, allowing them to easily find and secure parking spaces that suit their requirements.</p>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <img src='./seeker.jpg' className='services-img'></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About