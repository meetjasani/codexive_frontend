import React from 'react';
import { Navbar } from 'react-bootstrap';

const AdminAuthHeader = () => {
    return (

        <Navbar className="header-bg justify-content-center py-4">
            <Navbar.Brand className="text-white logo-text">Codexive Administrator</Navbar.Brand>
        </Navbar>
    )
}

export default AdminAuthHeader;
