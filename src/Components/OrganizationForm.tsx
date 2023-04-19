// OrganizationForm.tsx
import React, { useState, FormEvent } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useUserContext } from '../Context/UserContext';

interface OrganizationFormProps {
    onSubmit: (organization: Organization) => Promise<void>;
    currentUserID: string;
    rso_ID: number;
}

export interface Organization {
    rso_ID: number;
    name: string;
    admin_ID: number | null; // Add this line
    status?: string;
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({ onSubmit, currentUserID, rso_ID }) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('active');
    const { admin_ID } = useUserContext()

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit({
            name,
            status,
            rso_ID,
            admin_ID,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                label="RSO Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Box marginTop={2}>
                <Button fullWidth variant="contained" color="primary" type="submit">
                    Add Organization
                </Button>
            </Box>
        </form>
    );
};

export default OrganizationForm;