import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// The table's header
const header = (
    <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
        <span className="text-xl text-900 font-bold" style={{ fontSize: "21px" }}>Users</span>
    </div>
);

// This function displays the date as: 00/Mon/0000 (For example: 10 Jan 2020)
function translateDate(dateString) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const [year, month, day] = dateString.split('-').map(Number);
    return `${day} ${months[month - 1]} ${year}`;
}

// The admin panel component
function SystemAdmin(props) {
    // This state stores the users
    const [users, setUsers] = useState([]);
    // Get the users after rendering
    useEffect(() => {
        setUsers(JSON.parse(localStorage['Users']));
    }, []);
    // Builds the user image to display
    const imageBodyTemplate = (user) => {
        return <img src={user.image} alt={"User profile image"} className="w-6rem shadow-2 border-round" style={{ width: "6rem", borderRadius: "10px" }} />;
    };
    // Builds the user address to display
    const getUserAddress = (user) => {
        return <Tag value={`${user.city}, ${user.street} ${user.number}`}></Tag>;
    };
    // Builds the user email to display
    const getUserEmail = (user) => {
        return <Tag value={user.email}></Tag>;
    };
    // This function deletes a user by his email and displays a sweet alert
    const deleteUser = (userToDeleteEmail) => {
        props.deleteUser(userToDeleteEmail);
        Swal.fire({ title: "User Deleted", text: `You've successfully deleted the user!`, icon: "success" }).then(() => {
            setUsers(JSON.parse(localStorage['Users']));
        });
    };
    // This function is called when the admin requests to edit a user's details
    const adminEditUser = (userToEdit) => {
        props.editUser(userToEdit);
    };
    // This function builds the delete and edit buttons for each user
    const getUserButtons = (user) => {
        return <>
            <IconButton aria-label="edit" size="large" onClick={() => adminEditUser(user)}>
                <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="delete" size="large" onClick={() => deleteUser(user.email)}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </>;
    };
    // Render the component
    return (
        <div className="card">
            <DataTable value={users} header={header} tableStyle={{ minWidth: '60rem' }}>
                <Column field="name" header="Username" body={(user) => <Tag value={`${user.userName}`}></Tag>}></Column>
                <Column header="Image" body={imageBodyTemplate}></Column>
                <Column field="price" header="Name" body={(user) => <Tag value={`${user.firstName} ${user.lastName}`}></Tag>}></Column>
                <Column field="category" header="Birth date" body={(user) => <Tag value={translateDate(user.birthDate)}></Tag>}></Column>
                <Column field="rating" header="Address" body={getUserAddress}></Column>
                <Column header="Email" body={getUserEmail}></Column>
                <Column header="Edit/Delete" body={getUserButtons}></Column>
            </DataTable>
            <Button variant="contained" onClick={() => { props.logoutUser('admin') }} color='error' size="large" style={{ alignSelf: 'left', borderRadius: 5, marginBottom: 10, textTransform: 'none' }}>
                Logout
            </Button>
        </div>
    );
}

export default SystemAdmin;