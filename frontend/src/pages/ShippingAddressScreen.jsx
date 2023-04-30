import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Store } from '../Store'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingAddressScreen = () => {
    const navigate = useNavigate()
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { userInfo, cart: { shippingAddress } } = state

    const [fullname, setFullName] = useState(shippingAddress.fullname || '')
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping')
        }
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullname,
                address,
                city,
                postalCode,
                country
            }
        })

        // the local storage is display just in string format
        localStorage.setItem('shippingAddress',
            JSON.stringify({
                fullname,
                address,
                city,
                postalCode,
                country
            }));
        navigate('/payment')
    }


    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className='container small-container'>
                <h1 className='my-3'>Shipping Address</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='mb-3' controlId='fullname'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={fullname} onChange={(e) => setFullName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city} onChange={(e) => setCity(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='postalCode'>
                        <Form.Label>PostalCode</Form.Label>
                        <Form.Control value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </Form.Group>
                    {/* mb- margin bottom */}
                    <div className='mb-3'>
                        <Button type='submit'>
                            Continue
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default ShippingAddressScreen