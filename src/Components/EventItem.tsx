import React from 'react';
import { ListItem, ListItemText, Button } from '@mui/material';
import { AppEvent } from './Events';
import { useNavigate } from 'react-router-dom';

interface EventItemProps {
    event: AppEvent;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/events/${event.event_ID}`);
    };

    return (
        <ListItem>
            <ListItemText primary={event.Title} secondary={event.LocID} />
            <Button variant="contained" color="primary" onClick={handleClick}>
                View Event
            </Button>
        </ListItem>
    );
};

export default EventItem;
