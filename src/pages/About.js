import React from 'react'
import './../css/about.scss'

const About = () => {
    return (
        <div>
            <div className='overlay-about'>
                <h1>About</h1>
            </div>
            <div className='container'>
                <div className='row py-5 my-5'>
                    <h2 className='mb-3'>About Us</h2>
                    <p>"ParkEasy helps people find and rent out parking spaces in their community. If you have an extra parking spot, you can make some extra money by renting it out. And if you need an affordable place to park, we'll help you find one!"</p>
                </div>

                <div className='row mt-5 mb-5'>
                    <div className='col-md-6'>
                        <img src='./seeker.jpg' className='services-img'></img>
                    </div>
                    <div className='col-md-6 d-flex align-items-center'>
                        <div>
                            <h3>Parking Seekers</h3>
                            <p>The ParkEasy web application offers a convenient solution for individuals in search of parking. With this user-friendly platform, users can effortlessly search for parking spaces that match their preferences. Once they've identified a suitable spot, they can reserve it by completing the payment process. After confirmation, users will receive instructions on how to park their vehicles, ensuring a hassle-free and efficient parking experience that meets their specific needs.</p>
                        </div>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className='col-md-6 d-flex align-items-center'>
                        <div className='text-right'>
                            <h3>Parking Owners</h3>
                            <p>The ParkEasy web application provides a reliable service to community parking space owners, enabling them to efficiently lease their surplus parking spots and generate extra income. This platform simplifies the process for parking owners to list their available spaces, provide essential information, and establish competitive rental rates. Our user-friendly interface guarantees a smooth experience, allowing owners to handle their listings, communicate with prospective renters, and complete bookings. With Park Easy, parking space owners can optimize the use of their parking spots and tap into a fresh source of revenue. Get started with our platform today and enjoy the advantages of streamlined and lucrative parking space management.</p>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <img src='./owner.jpg' className='services-img'></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About