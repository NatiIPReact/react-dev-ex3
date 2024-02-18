import React, { useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody
}
    from 'mdb-react-ui-kit';
import { TextField, Button, Autocomplete } from '@mui/material';
import "../App.jsx";

// Holds the possible cities for the Autocomplete input field
const cities = ["Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beer Sheva", "Holon", "Bnei Brak", "Hadera", "Bat Yam", "Ashkelon"].sort();

function Register(props) {
    // Stores the users (Used to know whether the unique fields, such as email and username already exists or not)
    const [users, setUsers] = useState(localStorage['Users'] == undefined ? [] : JSON.parse(localStorage['Users']));
    // Stores the username input
    const [userName, setUserName] = useState('');
    // Stores the username helper text to display
    const [userNameHelperText, setUserNameHelperText] = useState('');
    // Stores the password input
    const [password, setPassword] = useState('');
    // Stores the password helper text to display
    const [passwordHelperText, setPasswordHelperText] = useState('');
    // Stores the verify password input
    const [verifyPassword, setVerifyPassword] = useState('');
    // Stores the verify password helper text to display
    const [verifyPasswordHelperText, setVerifyPasswordHelperText] = useState('');
    // Stores the first name input
    const [firstName, setFirstName] = useState('');
    // Stores the first name helper text to display
    const [firstNameHelperText, setFirstNameHelperText] = useState('');
    // Stores the last name input
    const [lastName, setLastName] = useState('');
    // Stores the last name helper text to display
    const [lastNameHelperText, setLastNameHelperText] = useState('');
    // Stores the birth date input
    const [birthDate, setBirthDate] = useState('');
    // Stores the birth date helper text to display
    const [birthDateHelperText, setBirthDateHelperText] = useState('');
    // Stores the email input
    const [email, setEmail] = useState('');
    // Stores the email helper text to display
    const [emailHelperText, setEmailHelperText] = useState('');
    // Stores the city input
    const [city, setCity] = useState('');
    // Stores the city helper text to display
    const [cityHelperText, setCityHelperText] = useState('');
    // Stores the street input
    const [street, setStreet] = useState('');
    // Stores the street text to display
    const [streetHelperText, setStreetHelperText] = useState('');
    // Stores the house number input
    const [number, setNumber] = useState('');
    // Stores the house number text to display
    const [numberHelperText, setNumberHelperText] = useState('');
    // Stores the image input
    const [image, setImage] = useState('');
    // Stores the image text to display
    const [imageHelperText, setImageHelperText] = useState('');
    // Checks wheter a character is a special character
    const isSpecialChar = (char) => {
        var specialCharRegex = /[!@#$%^&*()\-_=+\[\]{}|\\:;"'<>,.?/]/;
        return specialCharRegex.test(char);
    };
    // Checks whether the username is ok. (If not, show an error message)
    const checkUserName = () => {
        // Checks whether the username consist of letters, number, and special characters
        var regex = /[^a-zA-Z0-9!@#$%^&*()_+{}\[\]:;'"\\|,.<>?\/\-=`~ ]/;
        // If the user name is missing, show an error message
        if (userName == "") {
            setUserNameHelperText("Username is missing!");
            return;
        }
        // If the user name includes a non-user character, show an error message
        if (regex.test(userName)) {
            setUserNameHelperText("Invalid username!");
            return;
        }
        // If the user name is too long, show an error message
        if (userName.length > 60) {
            setUserNameHelperText("Username can't me longer than 60 characters!");
            return;
        }
        // If the user is trying to edit his username to "admin", show an error message (because that's the admin's username)
        if (userName === "admin") {
            setUserNameHelperText("This username is taken!");
            return;
        }
        // Loop over all users to see whether this user name is taken or not
        for (let i = 0; i < users.length; i++) {
            if (users[i].userName === userName) {
                setUserNameHelperText("This username is taken!");
                return;
            }
        }
        // If everything is fine, delete the error message
        setUserNameHelperText("");
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
        // If the same as verifyPassword, delete the verify password error message
        if (password === verifyPassword) {
            setVerifyPasswordHelperText("");
        }
    };
    // Checks whether the verify password is the same as password. (If not, show an error message)
    const checkVerifyPassword = () => {
        if (verifyPassword != password) {
            setVerifyPasswordHelperText('Passwords must be equal!');
            return;
        }
        setVerifyPasswordHelperText('');
    };
    // Checks whether the email is a valid email that ends in .com and it's not already taken (If not, show an error message)
    const checkEmail = () => {
        // Email can't be less than atleast 5 character (for @ and .com and two more letters between them)
        if (email.length < 7) {
            setEmailHelperText('Email can only contain letters, special character, have @ exactly once, and end in .com');
            return;
        }
        // If the email doesn't end in ".com"
        if (email.substring(email.length - 4).toLowerCase() !== ".com") {
            setEmailHelperText('Email can only contain letters, special character, have @ exactly once, and end in .com');
            return;
        }
        // Stores how many times we have @ in the email
        let countAt = 0;
        // Loop over the characters
        for (let i = 0; i < email.length; i++) {
            // If that's an invalid character, show an error message and return
            if (!(isSpecialChar(email[i]) || email[i] >= 'A' && email[i] <= 'Z' || email[i] >= 'a' && email[i] <= 'z' || email[i] == '@')) {
                setEmailHelperText('Email can only contain letters, special character, have @ exactly once, and end in .com');
                return;
            }
            // Count @
            if (email[i] == '@') {
                countAt++;
            }
        }
        // If we don't have exactly one @ show an error message and return
        if (countAt != 1) {
            setEmailHelperText('Email can only contain letters, special character, have @ exactly once, and end in .com');
            return;
        }
        // If we are missing characters at the start or between @ and .com show an error message and return
        let indexOfAt = email.indexOf('@');
        if (indexOfAt == 0 || indexOfAt == email.length - 5) {
            setEmailHelperText('Invalid Email!');
            return;
        }
        // Loop over all users to see this email is not already taken
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                setEmailHelperText("This email is taken!");
                return;
            }
        }
        setEmailHelperText("");
    };
    // Checks whether the birth date is according to the rules. (If not, show an error message)
    const checkBirthDate = () => {
        if (birthDate == "") {
            setBirthDateHelperText("Missing birth date!");
            return;
        }
        // Get the birth date as a date object
        var birthDateAsObject = new Date(birthDate);
        // Get todays date
        var currentDate = new Date();
        // Difference in milliseconds
        var differenceMs = currentDate - birthDateAsObject;
        // Difference in years
        var differenceYears = differenceMs / (1000 * 60 * 60 * 24 * 365.25);
        // If the date is less than or equal to 18 years
        if (differenceYears <= 18) {
            setBirthDateHelperText("You must be atleast 18 years old!");
            return;
        }
        // If the date is more than or equal to 120 years
        if (differenceYears >= 120) {
            setBirthDateHelperText("You can't be older than 120 years old!");
            return;
        }
        setBirthDateHelperText("");
    };
    // Checks whether the first name is according to the rules. (If not, show an error message)
    const checkFirstName = () => {
        if (firstName.length == 0) {
            setFirstNameHelperText('First name is missing!');
            return;
        }
        for (let i = 0; i < firstName.length; i++) {
            if (!(firstName[i] >= 'A' && firstName[i] <= 'Z' || firstName[i] >= 'a' && firstName[i] <= 'z' || firstName[i] >= 'א' && firstName[i] <= 'ת')) {
                setFirstNameHelperText("First name can only contain letters!");
                return;
            }
        }
        setFirstNameHelperText('');
    };
    // Checks whether the last name is according to the rules. (If not, show an error message)
    const checkLastName = () => {
        if (lastName.length == 0) {
            setLastNameHelperText('Last name is missing!');
            return;
        }
        for (let i = 0; i < lastName.length; i++) {
            if (!(lastName[i] >= 'A' && lastName[i] <= 'Z' || lastName[i] >= 'a' && lastName[i] <= 'z' || firstName[i] >= 'א' && firstName[i] <= 'ת')) {
                setLastNameHelperText("Last name can only contain letters!");
                return;
            }
        }
        setLastNameHelperText('');
    };
    // Checks whether the city is according to the rules. (If not, show an error message)
    const checkCity = () => {
        if (city == "") {
            setCityHelperText("Choose a city!");
            return;
        }
        setCityHelperText("");
    };
    // Checks whether the street is according to the rules. (If not, show an error message)
    const checkStreet = () => {
        if (street.length == 0) {
            setStreetHelperText('Enter a street!');
            return;
        }
        for (let i = 0; i < street.length; i++) {
            if (!(street[i] >= 'א' && street[i] <= 'ת')) {
                setStreetHelperText('Street can only contain Hebrew letters!');
                return;
            }
        }
        setStreetHelperText('');
    };
    // Checks whether the house number is according to the rules. (If not, show an error message)
    const checkNumber = () => {
        if (number == "") {
            setNumberHelperText("Enter your house number!");
            return;
        }
        if (isNaN(number) || number < 0) {
            setNumberHelperText("Invalid house number!");
            return;
        }
        setNumberHelperText("");
    };
    // Checks whether the image is according to the rules. (If not, show an error message)
    const checkImage = (img) => {
        if (img == null || img == "" || img.files && img.files.length == 0) {
            setImageHelperText('Choose an image!');
            return;
        }
        let fileNameSplit = img.files[0].name.split('.');
        if (fileNameSplit[fileNameSplit.length - 1] != "jpg" && fileNameSplit[fileNameSplit.length - 1] != "jpeg") {
            setImageHelperText('Supported file formats: .jpg, .jpeg');
            return;
        }
        let reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };
        setImageHelperText('');
        reader.readAsDataURL(img.files[0]);
    };
    // This function checks whether all the input fields are according to the rules, and if so, it'll register the user to our system.
    // Otherwise, the user'll see an error message
    const registerUser = () => {
        if (userNameHelperText !== '' || passwordHelperText !== '' || verifyPasswordHelperText !== '' || firstNameHelperText !== '' || lastNameHelperText !== ''
            || birthDateHelperText !== '' || emailHelperText !== '' || cityHelperText !== '' || streetHelperText !== '' || numberHelperText !== '' || imageHelperText !== ''
            || userName === "" || password === "" || verifyPassword === "" || firstName === "" || lastName === "" || birthDate === "" || email === "" || city === ""
            || street === "" || number === "" || image === "") {
            Swal.fire({ icon: "error", title: "Oops...", text: "Invalid Registration Form!" });
            return;
        }
        Swal.fire({ title: "Registration Successful!", text: "You've successfully registered to the system!", icon: "success" }).then(() => { props.moveToLogin(); });
        let newUser = { userName, password, firstName, lastName, birthDate, email, city, street, number, image };
        props.userRegistered(newUser);
    };
    // Render the component
    return (
        <>
            <MDBContainer fluid>
                <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '100%' }}>
                    <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                        <h2 className="fw-bold mb-2 text-uppercase">Registration</h2>
                        <p className="text-white-50 mb-5"></p>
                        <MDBRow className='d-flex justify-content-center align-items-center h-100'>

                            <MDBCol col='12'>
                                <TextField label="Username" {...(userNameHelperText ? { error: true } : {})} {...(userNameHelperText ? { helperText: userNameHelperText } : {})}
                                    onChange={(e) => { setUserName(e.target.value) }} onBlur={checkUserName} variant="filled" color="secondary" style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20 }} fullWidth /><br />


                                <TextField type='password' onChange={(e) => setPassword(e.target.value)} onBlur={checkPassword} {...(passwordHelperText ? { error: true } : {})} {...(passwordHelperText ? { helperText: passwordHelperText } : {})}
                                    label="Password" variant="filled" color="secondary" style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20 }} fullWidth /><br />


                                <TextField type='password' onChange={(e) => setVerifyPassword(e.target.value)} onBlur={checkVerifyPassword} {...(verifyPasswordHelperText ? { error: true } : {})} {...(verifyPasswordHelperText ? { helperText: verifyPasswordHelperText } : {})}
                                    label="Verify Password" variant="filled" color="secondary" style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20 }} fullWidth /><br />


                                <TextField label="Email" onChange={(e) => setEmail(e.target.value)} onBlur={checkEmail} {...(emailHelperText ? { error: true } : {})} {...(emailHelperText ? { helperText: emailHelperText } : {})}
                                    type='email' variant="filled" color="secondary" style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20 }} fullWidth /><br />


                                <TextField type='date' onChange={(e) => setBirthDate(e.target.value)} onBlur={checkBirthDate} {...(birthDateHelperText ? { error: true } : {})} {...(birthDateHelperText ? { helperText: birthDateHelperText } : {})}
                                    label="Birth Date" color='secondary' variant="filled" InputLabelProps={{ shrink: true }}
                                    style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20 }} fullWidth /><br />

                            </MDBCol>
                            <MDBCol col='12'>
                                <TextField label="First Name" onChange={(e) => setFirstName(e.target.value)} onBlur={checkFirstName} {...(firstNameHelperText ? { error: true } : {})} {...(firstNameHelperText ? { helperText: firstNameHelperText } : {})}
                                    variant="filled" color="secondary" style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20 }} fullWidth /><br />


                                <TextField label="Last Name" onChange={(e) => setLastName(e.target.value)} onBlur={checkLastName} {...(lastNameHelperText ? { error: true } : {})} {...(lastNameHelperText ? { helperText: lastNameHelperText } : {})}
                                    variant="filled" color="secondary" style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20 }} fullWidth /><br />


                                <Autocomplete disablePortal onChange={(e, value) => { setCity(value); }} onBlur={checkCity}
                                    options={cities} variant="filled" fullWidth renderInput={(params) => <TextField {...(cityHelperText ? { error: true } : {})} {...(cityHelperText ? { helperText: cityHelperText } : {})} color="secondary" variant="filled" {...params} label="City" />} style={{ backgroundColor: 'white', borderRadius: 8 }} /><br />


                                <TextField label="Street" onChange={(e) => setStreet(e.target.value)} onBlur={checkStreet} {...(streetHelperText ? { error: true } : {})} {...(streetHelperText ? { helperText: streetHelperText } : {})}
                                    variant="filled" color="secondary" style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20 }} fullWidth /><br />


                                <TextField type='number' onChange={(e) => setNumber(e.target.value)} onBlur={checkNumber} {...(numberHelperText ? { error: true } : {})} {...(numberHelperText ? { helperText: numberHelperText } : {})}
                                    label="House Number" variant="filled" color="secondary" style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20 }} fullWidth /><br />
                            </MDBCol>
                            <TextField type='file' onChange={(e) => checkImage(e.target)} {...(imageHelperText ? { error: true } : {})} {...(imageHelperText ? { helperText: imageHelperText } : {})}
                                label="Image" variant="filled" InputLabelProps={{ shrink: true }}
                                color="secondary" style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20 }} /><br />
                            <Button variant="contained" size="large" style={{ borderRadius: 5, marginBottom: 10, textTransform: 'none' }} onClick={registerUser}>
                                Register
                            </Button>
                            <div>
                                <p className="mb-0">Already have an account? <a href="#!" className="text-white-50 fw-bold" onClick={props.moveToLogin}>Sign In</a></p>

                            </div>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </>
    );
}

export default Register;