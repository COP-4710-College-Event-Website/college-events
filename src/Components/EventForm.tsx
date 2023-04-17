// EventForm.tsx
import React, { useState, FormEvent } from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';
import { AppEvent } from './Events';

interface EventFormProps {
    onSubmit: (event: Omit<AppEvent, 'event_ID'>) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [locID, setLocID] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit({
            Title: title,
            Date: date,
            LocID: locID,
            contact_name: contactName,
            contact_email: contactEmail,
            contact_phone: contactPhone,
            description: description,
            start: start,
            end: end,
        });
    };

    return (
        <Box margin={2} padding={2} border={1} borderColor="divider" borderRadius={4}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Date" type="date" variant="outlined" value={date} onChange={(e) => setDate(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Location ID" variant="outlined" value={locID} onChange={(e) => setLocID(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Contact Name" variant="outlined" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Contact Email" variant="outlined" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Contact Phone" variant="outlined" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Start Time" type="time" variant="outlined" value={start} onChange={(e) => setStart(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="End Time" type="time" variant="outlined" value={end} onChange={(e) => setEnd(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" color="primary" type="submit">
                            Add Event
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default EventForm;
