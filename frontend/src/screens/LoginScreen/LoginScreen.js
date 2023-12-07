import React, { useState } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import { LockFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';
import ErrorMessage from '../../components/ErrorMessage';


import axios from "axios";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };

            const { data } = await axios.post('api/users/login', {
                email,
                password,
            }, config);
            console.log(data);
            if (data) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                setSuccess("Login Successful");
                // Redirect to home page
                navigate('/home');
            }

        } catch (error) {
            setError(error.response.data.message);

        }
    };

    return (

        <div className='loginContainer'>
            {error && <ErrorMessage className="error" variant="danger">{error}</ErrorMessage>}
            {success && <ErrorMessage variant="success">{success}</ErrorMessage>}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="label">Email address</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label className="label">Password</Form.Label>
                    <div className="password-input">
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <LockFill className="password-icon" />
                    </div>
                </Form.Group>
                <div className='text-center'> {/* Center the button */}
                    <Button variant='primary' type='submit' onClick={submitHandler}>
                        Login
                    </Button>
                </div>
                <Row className="py-3">
                    <Col>
                        New Customer? <Link to="/signup" className="label">Register Here</Link>
                    </Col>
                </Row>
            </Form>

        </div>
    );
};

export default LoginScreen;
