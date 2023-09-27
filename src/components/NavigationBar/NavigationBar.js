import React from 'react'
import "./NavigationBar.css"
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

export default function NavigationBar() {

const { currentUser,logout, setCurrentUser } = useAuth();
console.log(currentUser);
const navigate = useNavigate();


async function handleLogout(){
    try{
        await logout();
        setCurrentUser(null);
        navigate("/login");
        
    }
    catch{
        console.log("Error Logging out");
    }
    
}

  return (
    <div id='navigationBar'>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                   <Link style={{textDecoration: "none", color: "black"}} to="/">Busy Buy</Link> 
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!currentUser && <>
                            <NavLink className="nav-link" style={ ({isActive}) => (isActive ? {color: "black", border : "1px solid", borderRadius: "10px"} : null) } to="/signup" >Sign Up</NavLink>    
                            <NavLink className="nav-link" style={ ({isActive}) => (isActive ? {color: "black", border : "1px solid", borderRadius: "10px"} : null) } to="/login" >Log In</NavLink> 
                        </> }
                        
                        {currentUser && <Nav.Link>
                            <Button className='btn-danger' onClick={handleLogout} >Log Out</Button> 
                        </Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Outlet />
    </div>
  )
}
