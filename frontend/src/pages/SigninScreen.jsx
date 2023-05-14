import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import { toast } from 'react-toastify'
import { getError } from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UsePasswordToggle from '../components/UsePasswordToggle'
import '../styles/SignUpStyles.css'
const SigninScreen = () => {
    const navigate = useNavigate();
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        console.log(e)
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/signin', {
                email, password
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/')
            toast.success('User signin successfully');
            // console.log(data)
        } catch (err) {
            toast.error(getError(err))
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const [toggleIconPassword, setToggleIconPassword] = UsePasswordToggle();

    return (
        <Container className='small-container'>
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1 className='my-3'>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label> Email
                        {/* <FontAwesomeIcon icon="user"/> */}
                    </Form.Label>
                    <Form.Control type='email' required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={toggleIconPassword} required onChange={(e) => setPassword(e.target.value)} />
                    <span className="set-password-toggle-icon">{setToggleIconPassword}</span>
                </Form.Group>
                <div className='mb-3'>
                    <button type='submit'>Sign In</button>
                </div>
            </Form>
            <div className='mb-3'>
                New customer?{' '}  <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
            </div>
            <div className='mb-3'>
                Forget Password?{' '}  <Link to={`/forget-password`}>Reset Password</Link>
            </div>
        </Container>
    )
}

export default SigninScreen