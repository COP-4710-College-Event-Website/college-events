import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { fetchEventComments, addComment } from '../api';
import { useUserContext } from '../Context/UserContext';

interface RouteParams {
    [key: string]: string | undefined;
    id: string;
}

interface Comment {
    comment_ID?: number;
    event_ID: any; // Add this line
    user_ID: string | null;
    text: string;
    rating: number;
}

const EventPage = () => {
    const { id } = useParams<RouteParams>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const { user_ID } = useUserContext();

    useEffect(() => {
        const event_ID = typeof id === 'string' ? parseInt(id, 10) : undefined;

        const fetchEventCommentsAsync = async () => {
            if (!event_ID) {
                return;
            }

            const response = await fetchEventComments(event_ID);
            if (response.success) {
                setComments(response.data);
            }
        };
        fetchEventCommentsAsync();
    }, [id]);

    const handleSubmitComment = async () => {

        const event_ID = typeof id === 'string' ? parseInt(id, 10) : undefined;

        if (!event_ID) {
            console.error('Invalid event ID:', id);
            return;
        }

        const response = await addComment({ event_ID, user_ID, text, rating });


        if (response.success) {
            console.log('Comment added successfully');
            setComments([...comments, response.data]);
        } else {
            console.error('Failed to add comment:', response.message);
        }
    };


    return (
        <Box>
            <Typography variant="h4">Event {id}</Typography>
            <Box>
                {comments.map((comment) => (
                    <Typography key={comment.comment_ID}>Rating:{comment.rating}          Comment:{comment.text}</Typography>
                ))}
            </Box>
            <Box>
                <TextField
                    label="Comment"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <TextField
                    label="Rating"
                    value={rating}
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 1 && value <= 5) {
                            setRating(value);
                        }
                    }}
                />
                <Button onClick={handleSubmitComment}>Submit Comment</Button>
            </Box>
        </Box>
    );
};

export default EventPage;
