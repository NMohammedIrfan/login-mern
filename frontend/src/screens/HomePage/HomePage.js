import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    // Fetch the email from local storage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userEmail = userInfo ? userInfo.name : '';
    setEmail(userEmail);
  }, []);

  return (
    <>
      <div className='main'>
        <Navbar className="navbar" expand="lg">
          <Navbar.Brand className="logo">
            TimeStraps
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="nav">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
            <Button className="button" variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          <h1> Welcome, {email}</h1>
          <h2>Strap Your Style, Enhance Your Time</h2>
        </div>
      </div>
    </>
  );
};

export default HomePage;
