import React, { useState, useEffect } from 'react';
import { Box, List, Typography, Button } from '@mui/material';
import OrganizationItem from './OrganizationItem';
import OrganizationForm from './OrganizationForm';
import { Organization } from './OrganizationForm';
import { fetchOrganizations, addOrganization } from '../api';
import { useUserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Organizations: React.FC = () => {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const { user_ID, userRole, admin_ID } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        const getOrganizations = async () => {
            const response = await fetchOrganizations();
            if (response.success) {
                setOrganizations(response.data);
            } else {
                setErrorMessage('Failed to fetch organizations');
                console.error('Failed to fetch organizations:', response.message);
            }
        };

        getOrganizations();
    }, []);

    const handleAddOrganization = async (organization: Organization) => {


        const response = await addOrganization({ ...organization, admin_ID: admin_ID });
        if (response.success) {
            console.log('Organization created successfully');
            setOrganizations([...organizations, { ...organization, admin_ID: admin_ID }]);
        } else {
            setErrorMessage('Failed to create organization');
            console.error('Failed to create organization:', response.message);
        }
    };



    const handleDeleteOrganization = async (organization: Organization) => {
        try {
            const response = await axios.delete(`http://localhost:5000/rso/${organization.rso_ID}`);
            if (response.status === 200) {
                console.log('Organization deleted successfully');
                const updatedOrganizations = organizations.filter((org) => org.rso_ID !== organization.rso_ID);
                setOrganizations(updatedOrganizations);
            }
        } catch (error) {
            console.error('Failed to delete organization:', error);
        }
    };


    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/events')}
            >
                Back
            </Button>
            <h1>RSO's</h1>
            <Box>
                {userRole === 'superadmin' && (
                    <Box marginBottom={4}>
                        <OrganizationForm onSubmit={handleAddOrganization} currentUserID={user_ID || ''} rso_ID={0} />
                    </Box>
                )}
                {errorMessage && (
                    <Box marginBottom={2}>
                        <Typography color="error">{errorMessage}</Typography>
                    </Box>
                )}
                <List>
                    {organizations.map((organization) => (
                        <>
                            <OrganizationItem key={organization.rso_ID} organization={organization} />
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDeleteOrganization(organization)}
                            >
                                Delete
                            </Button>

                        </>

                    ))}
                </List>
            </Box>
        </div>
    );
};

export default Organizations;
