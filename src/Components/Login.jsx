import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody
}
  from 'mdb-react-ui-kit';
import { TextField, Button } from '@mui/material';

// The login component
function Login(props) {
  // The username state
  const [userName, setUserName] = useState('');
  // Stores the username helper text
  const [userNameHelperText, setUserNameHelperText] = useState('');
  // The password state
  const [password, setPassword] = useState('');
  // Stores the password helper text
  const [passwordHelperText, setPasswordHelperText] = useState('');
  // Checks whether the username is ok. (If not, show an error message)
  const checkUserName = () => {
    var regex = /[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;'"\\|,.<>?\/\-=`~ ]/;
    if (userName == "") {
      setUserNameHelperText("Username is missing!");
      return;
    }
    if (regex.test(userName)) {
      setUserNameHelperText("Invalid username!");
      return;
    }
    if (userName.length > 60) {
      setUserNameHelperText("Username can't me longer than 60 characters!");
      return;
    }
    setUserNameHelperText("");
  };
  // Checks wheter a character is a special character
  const isSpecialChar = (char) => {
    var specialCharRegex = /[!@#$%^&*()\-_=+\[\]{}|\\:;"'<>,.?/]/;
    return specialCharRegex.test(char);
  };
  // Checks whether the password is according to the rules. (If not, show an error message)
  const checkPassword = () => {
    // If the password is less than 7 characters, show an error message
    if (password.length < 7) {
      setPasswordHelperText("Password must have atleast 7 characters!");
      return;
    }
    // If the password is more than 12 characters, show an error message
    if (password.length > 12) {
      setPasswordHelperText("Password can't have more than 12 characters!");
      return;
    }
    // If that's the admin's password
    if (password === "ad12343211ad") {
      setPasswordHelperText("");
      return;
    }
    // Check the password is valid (contains a number, capital letter and a special character)
    let foundNum = false, foundCapitalLetter = false, foundSpecialLetter = false;
    for (let i = 0; i < password.length; i++) {
      if (!foundNum && password[i] >= '0' && password[i] <= '9') foundNum = true;
      else if (!foundCapitalLetter && password[i] >= 'A' && password[i] <= 'Z') foundCapitalLetter = true;
      else if (!foundSpecialLetter && isSpecialChar(password[i])) foundSpecialLetter = true;
      if (foundNum && foundCapitalLetter && foundSpecialLetter) break;
    }
    // If not valid, show an error message
    if (!foundNum || !foundCapitalLetter || !foundSpecialLetter) {
      setPasswordHelperText("Password must contain a number, a capital letter, and a special letter!");
      return;
    }
    // If valid, delete the error message
    setPasswordHelperText("");
  };
  // Sends the login details to the father of this component to login
  const loginUser = () => {
    props.userLoggedIn(userName, password);
  };
  // Render the component
  return (
    <>
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>

            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5"></p>

                <TextField label="Username" variant="filled" color="secondary" style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20 }}
                  onChange={(e) => { setUserName(e.target.value) }} {...(userNameHelperText ? { error: true } : {})} {...(userNameHelperText ? { helperText: userNameHelperText } : {})} onBlur={checkUserName} />
                <TextField label="Password" type='password' variant="filled" color="secondary" style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20 }}
                  onChange={(e) => { setPassword(e.target.value) }} {...(passwordHelperText ? { error: true } : {})} {...(passwordHelperText ? { helperText: passwordHelperText } : {})} onBlur={checkPassword} />

                <Button variant="contained" size="large" style={{ borderRadius: 5, marginBottom: 10, textTransform: 'none' }} onClick={loginUser}>
                  Login
                </Button>

                <div>
                  <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold" onClick={props.moveToRegister}>Sign Up</a></p>

                </div>
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </>
  );
}

export default Login;