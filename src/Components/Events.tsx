import React, { useEffect, useState } from 'react';
import { getEvents } from '../api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Event {
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
    const [events, setEvents] = useState<Event[]>([]);

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

    return (
        <div>
            <h1>Events</h1>
            <TableContainer component={Paper}>
                <Table>
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
                            <TableRow key={event.event_ID}>
                                <TableCell>{event.Title}</TableCell>
                                <TableCell>{new Date(event.Date).toLocaleDateString()}</TableCell>
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
