import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchLocations } from '../api/api'
import CityCard from '../components/CityCard/CityCard'

import './../css/city.scss'

const City = () => {
    
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [locations, setLocations]=useState();
    //const [search, setSearch]=useState(false);

    const [searchForm, setSearchForm] = useState({
        city: '',
        country: ''
    })
    const navigate = useNavigate()
    useEffect(() => {
        fetchLocations({ setLocations })
    }, [])

    const cityCards = () => {
        console.log("locations inside citycards",locations)
        return locations && locations.map((item, index) => (
            <div className='col-md-4 cityCard' key={index}>
                <CityCard
                    location={item} 
                    // onClick={() => navigate('/address', { state: { parking: item } })}
                    />
            </div>
        ))
    }

    const handleSearchForm = ({ key, value }) => {
        setSearchForm({ ...searchForm, [key]: value })
    }


    function handleSearch() {
        setLocations([])
        fetchLocations({ setLocations, ...searchForm})
            
    }

    // const cityCards = () => {
    //     return (
    //         <div>
    //             <div className='col-md-4 cityCard'>
    //                 <CityCard city={city} country={country}/>
    //             </div>
    //         </div>
            
    //     )
    // }


    return (
        <div className='container'>
            <h1 className='mt-5'>Search Cities</h1>
            <div className='card p-4 mt-5 searchCity'>
                <div className='row g-3 d-flex align-items-center'>
                    <div className='col-md-3 city'>
                        <input type="text" placeholder='City' className='form-control' value={searchForm?.city} onChange={(e) => handleSearchForm({ key: 'city', value: e.target.value })} />
                    </div>
                    <div className='col-md-3 city'>
                        <input type="text" placeholder='Country' className='form-control' value={searchForm?.country} onChange={(e) => handleSearchForm({ key: 'country', value: e.target.value })} />
                    </div>
                    
                    <div className='col-md-3'>
                        <button type='submit' className='form-control btn btn-primary search' onClick={handleSearch}>
                            Search
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search ms-2" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className='row mt-2 g-5'>
                    {cityCards()}
            </div>
            
        </div>
        

    )
}

export default City