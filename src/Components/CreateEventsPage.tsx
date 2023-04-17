import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from './EventForm';
import { createEvent } from '../api';
import { AppEvent } from './Events';


export const CreateEventPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateEvent = async (event: Omit<AppEvent, 'event_ID'>) => {
        const maxIntValue = 2147483647;
        const event_ID = Math.floor(Math.random() * maxIntValue); // Generate a new UUID for the event_ID

        const response = await createEvent({ ...event, event_ID });

        if (response.success) {
            console.log('Event created successfully');
            navigate('/events');
        } else {
            console.error(`Event creation failed. Reason: ${response.message}`);
        }
    };

    return (
        <div>
            <h1>Create Event</h1>
            <EventForm onSubmit={handleCreateEvent} />
        </div>
    );
};
