import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import { toast } from 'react-toastify'
import { getError } from '../utils'

const SignupScreen = () => {
    const navigate = useNavigate();
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // const [errorMessage, setErrorMessage] = useState(false)
    const submitHandler = async (e) => {
        console.log(e)
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Passwords do not match');
            return;
        }
        try {
            const { data } = await axios.post('/api/users/signup', {
               name, email, password
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            // navigate(redirect || '/')
            // console.log(data)
        } catch (err) {
            toast.error(getError(err))
            // setErrorMessage(true)
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])


    return (
        <Container className='small-container'>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <h1 className='my-3'>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' required onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='ConfirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' required onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                {/* {errorMessage && <div style={{ color: 'red' }}> error</div>} */}
                <div className='mb-3'>
                    <button type='submit'>Sign Up</button>
                </div>
            </Form>
            <div className='mb-3'>
                Already have an account?{' '}
                <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
            </div>
        </Container>
    )
}

export default SignupScreen