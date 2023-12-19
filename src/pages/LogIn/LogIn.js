import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link , useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const {currentUser , login} = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e){
    console.log("Inside Login handler ", currentUser);
    e.preventDefault();
    try{
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      localStorage.setItem("email", emailRef.current.value);
      toast("Logged in Successfully ! ")
      navigate("/");
    }
    catch{
      setError("Failed to Log In");
      localStorage.setItem("email", "");
    }
    setLoading(false);
  }


  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth: "400px"}}>
            <Card>
              <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required />
                  </Form.Group>

                  <Form.Group id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required />
                  </Form.Group>
                  <Button disabled={loading} className='w-100' type='submit' >Log In</Button>
                </Form>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
              Need an account? <Link to="/signup">Sign Up</Link>
            </div>
          </div>
      </Container>

    </>
  )
}
