import React from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody
}
    from 'mdb-react-ui-kit';
import EmailIcon from '@mui/icons-material/Email';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CakeIcon from '@mui/icons-material/Cake';
import { Button } from '@mui/material';

// Stores the logged user
var loggedUser;

// This function displays the date as: 00/Mon/0000 (For example: 10 Jan 2020)
function translateDate(dateString) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const [year, month, day] = dateString.split('-').map(Number);
    return `${day} ${months[month - 1]} ${year}`;
}

// The profile component
function Profile(props) {
    // Get the logged user from the sessionStorage, if one doesn't exist show a paragraph saying "You need to login first!"
    if (sessionStorage['loggedUser'] != undefined) {
        loggedUser = JSON.parse(sessionStorage['loggedUser']);
    } else {
        return (<p style={{ color: "red", fontSize: "70px" }}>You need to login first!</p>);
    }
    // Render the component with the user's data
    return (
        <MDBContainer fluid>
            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '100%' }}>
                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100' style={{ width: '100%' }}>
                    <h2 className="fw-bold mb-2">Hi, {loggedUser.firstName} {loggedUser.lastName}</h2>
                    <p className="text-white-50 mb-5"></p>
                    <MDBRow className='d-flex h-100' style={{ width: '100%', justifyContent: 'center' }}>
                        <MDBCol col='12' className='d-flex align-items-center justify-content-center' style={{ textAlign: 'left' }} >
                            <img src={loggedUser.image} style={{ maxWidth: "20%", borderRadius: "30px", marginRight: '30px' }}></img>
                            <div>
                                <EmailIcon /> <span style={{ fontSize: '18px' }}>{loggedUser.email}</span><br />
                                <FmdGoodIcon /> <span style={{ fontSize: '18px' }}>{loggedUser.city}, {loggedUser.street}, {loggedUser.number}</span><br />
                                <CakeIcon /> <span style={{ fontSize: '18px' }}>{translateDate(loggedUser.birthDate)}</span>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className='d-flex h-100' style={{ width: '100%', justifyContent: 'center' }}>
                        <MDBCol col='12' className='d-flex align-items-center justify-content-center' style={{ textAlign: 'left' }} >
                            <Button onClick={props.moveToEditDetails} variant="contained" size="large" color='secondary' style={{ borderRadius: 5, marginTop: '30px', textTransform: 'none', width: "23%" }}>
                                Update Details
                            </Button>
                            <Button variant="contained" size="large" style={{ borderRadius: 5, marginTop: '30px', marginLeft: '10px', marginRight: '10px', textTransform: 'none', width: "23%" }}
                                onClick={() => { window.location.href = 'https://store.steampowered.com/app/730/CounterStrike_2/'; }}>
                                Game
                            </Button>
                            <Button onClick={() => { props.logoutUser(loggedUser.email) }} variant="contained" size="large" color='error' style={{ borderRadius: 5, marginTop: '30px', textTransform: 'none', width: "23%" }}>
                                Logout
                            </Button>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default Profile;