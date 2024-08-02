import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.scss'
import { useSelector } from 'react-redux'

const CityCard = ({location}) => {
    const { city, country} = location
    const navigate = useNavigate()
    const lowerCaseCity=city.toLowerCase()
    const url = `/${lowerCaseCity}`;
    function handleClick() {
        navigate(url)
    }

    return (
        <div className='card cityCard'>
            <div>
                <div className='d-flex justify-content-between'>
                    <h3 className='mt-3 ms-4'>City: {city}</h3>
                </div>
                <div className='d-flex justify-content-between'>
                    <h3 className='mt-3 ms-4'>Country: {country}</h3>
                </div>
                <button type="submit" className="btn btn-outline-primary mt-3 cityButton" onClick={() => handleClick()}>Select</button>
            </div>
        </div>
    )
}

export default CityCard