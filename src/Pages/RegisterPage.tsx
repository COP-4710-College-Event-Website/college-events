// RegisterPage.tsx
import React, { FormEvent, useState } from 'react';
import { Container, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { register } from '../api';

interface RegisterFormProps {
    onRegister: (data: RegisterData) => Promise<void>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [rsoId, setRsoId] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await onRegister({ userId, password, name, rsoId });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box marginBottom={2}>
                <TextField fullWidth label="User ID" variant="outlined" value={userId} onChange={(e) => setUserId(e.target.value)} />
            </Box>
            <Box marginBottom={2}>
                <TextField fullWidth label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Box>
            <Box marginBottom={2}>
                <TextField fullWidth label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box marginBottom={2}>
                <TextField fullWidth label="RSO ID" variant="outlined" value={rsoId} onChange={(e) => setRsoId(e.target.value)} />
            </Box>
            <Button fullWidth variant="contained" color="primary" type="submit">
                Register
            </Button>
        </form>
    );
};

interface RegisterData {
    userId: string;
    password: string;
    name: string;
    rsoId: string;
}

const RegisterPage: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleRegister = async (data: RegisterData) => {
        setLoading(true);
        const response = await register(data);

        if (response.success) {
            console.log('Registered successfully.');
            // Navigate to another page or show a success message to the user
        } else {
            console.error(`Registration failed. Reason: ${response.message}`);
            // Show an error message to the user
        }

        setLoading(false);
    };

    return (
        <Container maxWidth="xs">
            <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="center">
                <Typography variant="h4" align="center" gutterBottom>
                    Register
                </Typography>
                <RegisterForm onRegister={handleRegister} />
                {loading && (
                    <Box marginTop={2}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default RegisterPage;
