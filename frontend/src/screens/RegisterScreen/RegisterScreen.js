import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import useHistory from react-router-dom
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


//axios.  You'll use it to call the endpoint or connect the frontend to the backend as the case may be.

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords Do not Match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
       
        const { data } = await axios.post("api/users/", {
          name,
          email,
          password,
        }, config);
        if (data) {
        
          localStorage.setItem("userInfo", JSON.stringify(data));
          navigate('/login') // Navigate to the login page after successful registration
        }
      } catch (error) {
        setError(error.response.data.message);
        
      }
    }
  };

  return (
    <div className="loginContainer">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {/* {loading && <Loading />} */}
      <Form onSubmit={(e) => submitHandler(e)}>
        <Form.Group controlId="name">
          <Form.Label className="label">Name</Form.Label>
          <Form.Control
            type="name"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

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
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label className="label">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className='text-center'> {/* Center the button */}
          <Button variant='primary' type='submit' onClick={submitHandler}>
        signup
          </Button>
        </div>
        <Row className="py-3">
          <Col className="col">
          Already Signup? <Link to="/login" className="label">Login?</Link>
          </Col>
        </Row>
      </Form>

    </div>
  );
};

export default RegisterScreen;
