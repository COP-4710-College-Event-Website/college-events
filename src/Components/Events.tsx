import React, { useEffect, useState } from 'react';
import { getEvents, createEvent } from '../api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../Context/UserContext';


export interface AppEvent {
    Date: string;
    LocID: string;
    Title: string;
    contact_email: string;
    contact_name: string;
    contact_phone: string;
    description: string;
    end: string;
    event_ID: number;
    start: string;
}

const Events: React.FC = () => {
    const [events, setEvents] = useState<AppEvent[]>([]);
    const navigate = useNavigate();
    const { userRole } = useUserContext();

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await getEvents();
            if (response.success) {
                setEvents(response.data);
            } else {
                console.error(`Failed to fetch events. Reason: ${response.message}`);
            }
        };

        fetchEvents();
    }, []);

    const handleAddEventButtonClick = () => {
        navigate('/create-event');
    };

    const handleTableRowClick = (event: AppEvent) => {
        navigate(`/events/${event.event_ID}`);
    };

    return (
        <div>
            <h1>Events</h1>
            {userRole === 'admin' || userRole === 'superadmin' ? (
                <Box marginBottom={2} display="flex" justifyContent="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/event-form')}
                    >
                        Add Event
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate('/organizations')}
                        style={{ marginRight: 8 }}
                    >
                        View Organizations
                    </Button>
                </Box>
            ) : null}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="events table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Contact Name</TableCell>
                            <TableCell>Contact Email</TableCell>
                            <TableCell>Contact Phone</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event) => (
                            <TableRow
                                key={event.event_ID}
                                onClick={() => handleTableRowClick(event)}
                                style={{ cursor: 'pointer' }}
                            >
                                <TableCell>{event.Title}</TableCell>
                                <TableCell>{event.Date}</TableCell>
                                <TableCell>{event.LocID}</TableCell>
                                <TableCell>{event.contact_name}</TableCell>
                                <TableCell>{event.contact_email}</TableCell>
                                <TableCell>{event.contact_phone}</TableCell>
                                <TableCell>{event.description}</TableCell>
                                <TableCell>{event.start}</TableCell>
                                <TableCell>{event.end}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Events;
