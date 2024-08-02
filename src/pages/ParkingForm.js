import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createParking, updateParking, createCity} from '../api/api'
import './../css/createParking.scss'

const ParkingForm = () => {
    const { state } = useLocation()
    const user = useSelector((state) => state.user);
    //const user_name=user.name;
    //console.log("inside parking form", user_name)
    // Create a form object for storing values
    const [form, setForm] = useState({
        name: '',
        address: '',
        city: '',
        country:'',
        lat: '',
        long: ''
    })

    const [successMessage, setSuccessMessage] = useState()
    const [error, setError] = useState()

    const [successCity, setSuccessCity] = useState()
    const [cityerror, setCityError] = useState()

    const navigate = useNavigate();

    // Handles form values upon change
    const handleFormChange = ({ key, value }) => {
        setForm({ ...form, [key]: value })
    }

    // Create new parking API
    const handleCreateParking = () => {
        setSuccessMessage()
        setError()
        setSuccessCity()
        setCityError()
        const body = { ...form, user_id: user?._id, user_name:user?.name }
        createParking({ body, handleCreateParkingSuccess, handleCreateParkingFailure })
        createCity({body, handleCreateCitySuccess, handleCreateCityFailure})
    }
    const handleCreateCitySuccess = (data) => {
        setSuccessCity('City Created successfully!')
    }
    const handleCreateCityFailure = (error) => {
        setCityError(error)
    }


    const handleCreateParkingSuccess = (data) => {
        setSuccessMessage('Created successfully!')
        alert("Created successfully!")
        navigate('/parking')

    }

    const handleCreateParkingFailure = (error) => {
        setError(error)
    }

    // Edit parking API
    const handleUpdateParking = () => {
        setSuccessMessage()
        setError()

        const body = { ...form }
        updateParking({ id: state?.parking?._id, body, handleUpdateParkingSuccess, handleUpdateParkingFailure })
    }

    const handleUpdateParkingSuccess = (data) => {
        setSuccessMessage('Updated successfully!')
    }

    const handleUpdateParkingFailure = (error) => {
        setError(error)
    }

    const handleSubmit = () => {
        console.log("state")
        console.log(state)
        if (state?.parking) {
            handleUpdateParking()
        }
        else {
            handleCreateParking()
        }
    }

    useEffect(() => {                   
        setForm({
            name: state?.parking?.name,
            address: state?.parking?.address,
            city: state?.parking?.city,
            country: state?.parking?.country,
            lat: state?.parking?.lat,
            long: state?.parking?.long
        })
    }, [state])

    return (
        <div className='container py-5'>
            <div className='card create-parking-card p-5'>
                <h3 className='mb-4'>{state?.parking ? 'Update': 'Create'} parking</h3>
                {successMessage && <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>}
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Parking Name</label>
                    <input type="text" className="form-control" id="name" value={form?.name} onChange={(e) => handleFormChange({ key: 'name', value: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea rows={2} type="text" className="form-control" id="address" value={form?.address} onChange={(e) => handleFormChange({ key: 'address', value: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" value={form?.city} onChange={(e) => handleFormChange({ key: 'city', value: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">Country</label>
                    <input type="text" className="form-control" id="city" value={form?.country} onChange={(e) => handleFormChange({ key: 'country', value: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lat" className="form-label">Lat</label>
                    <input type="number" className="form-control" id="lat" value={form?.lat} onChange={(e) => handleFormChange({ key: 'lat', value: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="long" className="form-label">Long</label>
                    <input type="number" className="form-control" id="long" value={form?.long} onChange={(e) => handleFormChange({ key: 'long', value: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary mt-4" onClick={handleSubmit}>Create</button>
            </div>
        </div>
    )
}

export default ParkingForm