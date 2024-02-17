import { useEffect, useState } from 'react'
import './App.css'
import Login from './Components/Login'
import Register from './Components/Register'
import Profile from './Components/Profile'
import EditDetails from './Components/EditDetails'
import SystemAdmin from './Components/SystemAdmin'
import swal from 'sweetalert2';
window.Swal = swal;

// Used to load users from the localStorage. If "Users" is not saved in localStorage, we'll save an empty array as "Users" and return it
function loadUsers() {
  if (localStorage['Users'] == undefined) {
    localStorage['Users'] = JSON.stringify([]);
    return [];
  }
  return JSON.parse(localStorage['Users']);
}

function App() {
  // This function gets a username and a password and tries to log this user in
  // If there's a user with this name and password, we'll log in and show the "Profile" component
  const loginUser = (userName, password) => {
    // If the username is missing, show an error message
    if (userName == "") {
      Swal.fire({ icon: "error", title: "Missing Information", text: "Enter a username!" });
      return;
    }
    // If the password is missing, show an error message
    if (password == "") {
      Swal.fire({ icon: "error", title: "Missing Information", text: "Enter a password!" });
      return;
    }
    // If that's the admin connecting, show the SystemAdmin component
    if (userName === "admin" && password === "ad12343211ad") {
      sessionStorage['loggedUser'] = JSON.stringify({ userName: "admin", email: 'admin' });
      Swal.fire({ title: "Login Successful", text: `Welcome, admin!`, icon: "success" }).then(() => setComponentToShow("SystemAdmin"));
      return;
    }
    // Stores whether we've seen this user or not (So we can differentiate between whether the user doesn't exist or the password was incorrect)
    let userExists = false;
    // Loop over all users
    for (let i = 0; i < users.length; i++) {
      // If we found the user and the password is correct, log the user in and show the Profile component
      if (userName === users[i].userName && password === users[i].password) {
        sessionStorage['loggedUser'] = JSON.stringify(users[i]);
        Swal.fire({ title: "Login Successful", text: `Welcome, ${users[i].firstName}!`, icon: "success" })
          .then(() => setComponentToShow("Profile"));
        return;
      }
      // If we found the user but the password is wrong, set userExists to true so we'd know to show a wrong password error message
      if (userName === users[i].userName) {
        userExists = true;
        break;
      }
    }
    // If we've reached here, either the user doesn't exist or the password was wrong. (We know what happed by the value of userExists,
    // and thus we can show the corresponding error message)
    Swal.fire({ icon: "error", title: "Login Failed", text: userExists ? "Incorrect Password!" : "User doesn't exist!" });
  };

  // This function gets an email and checks whether this is the logged in user. If so, we'll log this user out.
  const logoutUser = (email) => {
    let user = JSON.parse(sessionStorage['loggedUser']);
    if (user.email === email) {
      Swal.fire({ title: "Logout Successful", text: "You've successfully logged out!", icon: "success" }).then(() => { setComponentToShow("Login"); });
      sessionStorage.removeItem("loggedUser");
      sessionStorage.removeItem('editingUser');
    } else {
      Swal.fire({ icon: "error", title: "Logout Failed", text: "You can't logout from a different user!" });
    }
  };

  // This function gets a user object and updates its details in the "Users" array (except the email - which serves as an identifier) and
  // stores the updated array in the localStorage (and sessionStorage if that's the logged in user)
  const editUser = (user) => {
    let tmpNewUsers = [...users];
    for (let i = 0; i < tmpNewUsers.length; i++) {
      if (tmpNewUsers[i].email === user.email) {
        tmpNewUsers[i].userName = user.userName;
        tmpNewUsers[i].birthDate = user.birthDate;
        tmpNewUsers[i].city = user.city;
        tmpNewUsers[i].firstName = user.firstName;
        tmpNewUsers[i].image = user.image;
        tmpNewUsers[i].lastName = user.lastName;
        tmpNewUsers[i].number = user.number;
        tmpNewUsers[i].password = user.password;
        tmpNewUsers[i].street = user.street;
        localStorage['Users'] = JSON.stringify(tmpNewUsers);
        if (JSON.parse(sessionStorage['loggedUser']).email === user.email) {
          sessionStorage['loggedUser'] = JSON.stringify(tmpNewUsers[i]);
        }
        setUsers([...tmpNewUsers]);
        return;
      }
    }
    Swal.fire({ icon: "error", title: "Edit Failed", text: "User not found!" });
  };

  // This function gets a user email and deletes this user from the users array (and saves the change to the localStorage)
  const deleteUser = (userToDeleteEmail) => {
    let tmpNewUsers = [...users];
    for (let i = 0; i < tmpNewUsers.length; i++) {
      if (tmpNewUsers[i].email === userToDeleteEmail) {
        tmpNewUsers.splice(i, 1);
        setUsers([...tmpNewUsers]);
        localStorage['Users'] = JSON.stringify(tmpNewUsers);
        return;
      }
    }
  };
  // This function is used when the admin is editing a user. It'll save the user he's trying to edit in the sessionStorage so the EditDetails
  // component would know which user the admin wants to edit.
  const adminEditUser = (userToEdit) => {
    sessionStorage['editingUser'] = JSON.stringify(userToEdit);
    setComponentToShow('EditDetails');
  };

  // This state stores the component we should currently show (By default the site launches with the Register component)
  const [componentToShow, setComponentToShow] = useState("Register");
  // This state stores the users we have
  const [users, setUsers] = useState([]);
  // When the component first loads, we'll get the users array from the localStorage (it's like componentDidMount)
  useEffect(() => {
    setUsers(loadUsers());
  }, []);
  // This function gets a user that just registered, pushes it into the users array and stores it in the localStorage and the users state
  const registerUser = (userToAdd) => {
    let tmpNewUsers = [...users];
    tmpNewUsers.push(userToAdd);
    localStorage['Users'] = JSON.stringify(tmpNewUsers);
    setUsers(tmpNewUsers);
  }
  // Switch on the component we should currently show, depends on the componentToShow state.
  let component = <Register userRegistered={registerUser} moveToLogin={() => { setComponentToShow("Login") }} />;
  switch (componentToShow) {
    case "Login":
      component = <Login userLoggedIn={loginUser} moveToRegister={() => { setComponentToShow("Register") }} />;
      break;
    case "Profile":
      component = <Profile logoutUser={logoutUser} moveToEditDetails={() => { setComponentToShow("EditDetails") }} />;
      break;
    case "EditDetails":
      component = <EditDetails editUser={editUser} moveToSystemAdmin={() => { sessionStorage.removeItem('editingUser'); setComponentToShow('SystemAdmin') }} moveToLogin={() => { setComponentToShow("Login") }} moveToProfile={() => { setComponentToShow('Profile') }} />;
      break;
    case "SystemAdmin":
      component = <SystemAdmin logoutUser={logoutUser} deleteUser={deleteUser} editUser={adminEditUser} />;
      break;
  }
  // Render the component we are currently showing
  return (
    <>
      {component}
    </>
  )
}

export default App
