// HomePage.tsx
import React, { FormEvent, useState } from 'react';
import { Container, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logon } from '../api';
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
    const navigate = useNavigate();
    const { setUser_ID } = useUserContext();

    const handleLogin = async (user_ID: string, password: string) => {
        setLoading(true);
        const response = await logon({ user_ID, password });

        if (response.success) {
            console.log(response);
            console.log(`Logged in successfully. Response: ${response}`);
            setUser_ID(user_ID); // Set the user_ID in the context
            navigate('/events'); // Navigate to the Events page
        } else {
            console.error(`Login failed. Reason: ${response.message}`);
            // Show an error message to the user
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
