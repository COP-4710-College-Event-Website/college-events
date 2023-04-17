// HomePage.tsx
import React, { FormEvent, useState } from 'react';
import { Container, Box, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logon, isAdmin, isSuperAdmin } from '../api';
import { useUserContext } from '../Context/UserContext';


interface LoginFormProps {
    onLogin: (user_ID: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [user_ID, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onLogin(user_ID, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box marginBottom={2}>
                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={user_ID}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Box>
            <Box marginBottom={2}>
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Button fullWidth variant="contained" color="primary" type="submit">
                Login
            </Button>
        </form>
    );
};

const HomePage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setUser_ID, setUserRole } = useUserContext();

    const handleLogin = async (user_ID: string, password: string) => {
        setLoading(true);
        setError(null);
        const response = await logon({ user_ID, password });

        if (response.success) {
            console.log(response);
            setUser_ID(user_ID); // Set the user_ID in the context

            // Check if the user is an admin or super admin
            const superAdminResponse = await isSuperAdmin(user_ID);

            if (superAdminResponse.success) {
                console.log("superadmin");
                setUserRole('superadmin');
            } else {
                // Check if the user is an admin
                const adminResponse = await isAdmin(user_ID);

                if (adminResponse.success) {
                    console.log("admin");
                    setUserRole('admin');
                } else {
                    console.log("student");
                    setUserRole('student');
                }
            }

            navigate('/events'); // Navigate to the Events page
        } else {
            console.error(`Login failed. Reason: ${response.message}`);
            setError("Invalid Username or Password");
        }

        setLoading(false);
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <Container maxWidth="xs">
            <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="center">
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome to My App
                </Typography>
                <LoginForm onLogin={handleLogin} />
                {error && (
                    <Box marginTop={2}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                )}
                {loading && (
                    <Box marginTop={2}>
                        <CircularProgress />
                    </Box>
                )}
                <Box marginTop={2}>
                    <Button fullWidth variant="text" color="primary" onClick={navigateToRegister}>
                        Navigate to Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default HomePage;
