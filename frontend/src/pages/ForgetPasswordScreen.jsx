import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { getError } from '../utils';
import axios from 'axios';




const ForgetPasswordScreen = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const { state } = useContext(Store);
    const { userInfo } = state;


    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // /api/users/forget-password
            const { data } = await axios.post('/api/users/forget-password', { email });
            toast.success(data.message);
            console.log(data.message)
        } catch (err) {
            toast.error(getError(err));
        }
    };


    return (
        <Container className="small-container">
            <Helmet>
                <title>Forget Password</title>
            </Helmet>
            <h1 className="my-3">Forget Password</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>


                <div className="mb-3">
                    <button type="submit">submit</button>
                </div>
            </Form>

        </Container>
    )
}

export default ForgetPasswordScreen



