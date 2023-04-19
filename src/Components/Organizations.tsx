import React, { useState, useEffect } from 'react';
import { Box, List, Typography } from '@mui/material';
import OrganizationItem from './OrganizationItem';
import OrganizationForm from './OrganizationForm';
import { Organization } from './OrganizationForm';
import { fetchOrganizations, addOrganization } from '../api';
import { useUserContext } from '../Context/UserContext';

const Organizations: React.FC = () => {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const { user_ID, userRole, admin_ID } = useUserContext();

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
        const maxIntValue = 2147483647;
        const rso_ID = Math.floor(Math.random() * maxIntValue);

        const response = await addOrganization({ ...organization, admin_ID: admin_ID, rso_ID });
        if (response.success) {
            console.log('Organization created successfully');
            setOrganizations([...organizations, { ...organization, rso_ID: response.data.insertId, admin_ID: admin_ID }]);
        } else {
            setErrorMessage('Failed to create organization');
            console.error('Failed to create organization:', response.message);
        }
    };

    return (
        <div>
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
                        <OrganizationItem key={organization.rso_ID} organization={organization} />
                    ))}
                </List>
            </Box>
        </div>
    );
};

export default Organizations;
