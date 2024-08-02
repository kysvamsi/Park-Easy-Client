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
    const [searchForm, setSearchForm] = useState({
        country: '',
        city: '',
        address:''
    })

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

    const handleSearchForm = ({ key, value }) => {
        setSearchForm({ ...searchForm, [key]: value })
    }

    const handleSearch = () => {
        setParkings([])
        if (user?.type === 'owner') {
            fetchParkings({ user_id: user?._id, setParkings, ...searchForm })
        }
        else {
            fetchParkings({ setParkings, ...searchForm })
        }
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
            <div className='card p-4 mt-5 searchbox'>
                <div className='row g-3 d-flex align-items-center'>
                    
                    <div className='col-md-3 country'>
                        <input type="text" placeholder='Country' className='form-control' value={searchForm?.country} onChange={(e) => handleSearchForm({ key: 'country', value: e.target.value })} />
                    </div>
                    <div className='col-md-3 city'>
                        <input type="text" placeholder='City' className='form-control' value={searchForm?.city} onChange={(e) => handleSearchForm({ key: 'city', value: e.target.value })} />
                    </div>
                    <div className='col-md-3 address'>
                        <input type="text" placeholder='Address' className='form-control' value={searchForm?.address} onChange={(e) => handleSearchForm({ key: 'address', value: e.target.value })} />
                    </div>
                    
                    <div className='col-md-3'>
                        <button type='submit' className='form-control btn btn-primary searchtick' onClick={handleSearch}>
                            Search
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search ms-2" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className='row mt-2 g-5'>
                {parkingCards()}
            </div>
            <DeleteModal value={selectedParking?.name} showModal={showDeleteModal} setShowModal={setShowDeleteModal} onDeleteConfirm={handleDeleteParking}/>
        </div>
    )
}

export default Parking