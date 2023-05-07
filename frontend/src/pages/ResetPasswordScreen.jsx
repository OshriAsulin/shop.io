import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getError } from '../utils';
import { Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const ResetPasswordScreen = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        if (userInfo || !token) {
            navigate('/');
        }
    }, [navigate, userInfo, token]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            await axios.post('/api/users/reset-password', { password, token });
            navigate('/signin');
            toast.success('Password updated successfully');
        } catch (err) {
            toast.error(getError(err));
        }
    };


    return (
        <Container className="small-container">
            <Helmet>
                <title>Reset Password</title>
            </Helmet>
            <h1 className="my-3">Reset Password</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <div className="mb-3">
                    <button type="submit">Reset Password</button>
                </div>
            </Form>
        </Container>

    )
}

export default ResetPasswordScreen