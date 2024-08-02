import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { fetchAddresses } from '../api/api'
import { ParkingCard } from '../components'
import { fetchParkings } from '../api/api'
import './../css/parking.scss'

const Address = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()
    let { city } = useParams()
    const [addresses, setAddresses] = useState()
    const [address, setAddress]=useState()

    // Delete management states
    const [selectedParking, setSelectedParking] = useState()
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        // Parking List API sets parkings state using setParkings passed as callback function
        if (user?.type === 'owner') {
            console.log("usertype")
            console.log(user?._id)
            fetchAddresses({ user_id: user?._id, city, setAddresses })
        }
        else {
            fetchAddresses({ city, setAddresses })
        }
    }, [])


    const parkingCards = () => {
        return addresses && addresses.map((item, index) => (
            <div className='col-md-4' key={index}>
                <ParkingCard
                    parking={item}
                    onClick={() => navigate('/space', { state: { parking: item } })}
                    setSelectedParking={setSelectedParking}
                    setShowDeleteModal={setShowDeleteModal} 
                    />
            </div>
        ))
    }

    function handleSearch() {
        setAddresses([])
        if (user?.type === 'owner') {
            console.log("usertype")
            console.log(user?._id)
            fetchAddresses({ user_id: user?._id, address, city, setAddresses })
        }
        else {
            fetchAddresses({ address, city, setAddresses })
        }

    }
  





    return (
        <div className='container'>
            <h1 className='mt-5'>Search Addresses</h1>
            <div className='card p-4 mt-5 blacksearch'>
                <div className='row g-3 d-flex'>
                    <div className='col-md-3 address'>
                        <input type="text" placeholder='Address' className='form-control' onChange={event => { setAddress(event.target.value) }} />
                    </div>
                    <div className='col-md-3 addresssearch'>
                        <button type='submit' className='form-control btn btn-primary' onClick={handleSearch}>
                            Search
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search ms-2" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <h4 className='mt-5'>All addresses in the city</h4>


            <div className='row mt-2 g-5'>
                {parkingCards()}
            </div>

            {/* <DeleteModal value={selectedParking?.name} showModal={showDeleteModal} setShowModal={setShowDeleteModal} onDeleteConfirm={handleDeleteParking}/> */}
        </div>
    )
}

export default Address