import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, TextField, Button, Typography, Table, TableContainer, TableRow, TableCell, TableHead, TableBody, Paper } from '@mui/material';
import { fetchEventComments, addComment } from '../api';
import { useUserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

interface RouteParams {
    [key: string]: string | undefined;
    id: string;
}

interface Comment {
    commentID?: number;
    event_ID: any; // Add this line
    user_ID: string | null;
    text: string;
    rating: number;
    time?: any;
}

const EventPage = () => {
    const { id } = useParams<RouteParams>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const { user_ID, userRole } = useUserContext();
    const navigate = useNavigate();

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

    const handleDeleteEvent = async (comment: Comment) => {
        console.log(comment.commentID);
        const response = await fetch(`http://localhost:5000/comments/${comment.commentID}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const updatedComments = comments.filter((c) => c.commentID !== comment.commentID);
            setComments(updatedComments);
        } else {
            console.error(`Failed to delete comment ${comment.commentID}. Reason: ${response.statusText}`);
        }
    };


    return (
        <Box>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/events')}
            >
                Back
            </Button>
            <Typography variant="h4">Event {id}</Typography>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h5">Comments:</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Comment</TableCell>
                                <TableCell>Time</TableCell>
                                {userRole === 'admin' || userRole === 'superadmin' ? (
                                    <TableCell>Delete</TableCell>
                                ) : null}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {comments.map((comment) => (
                                <TableRow key={comment.commentID}>
                                    <TableCell>{comment.user_ID}</TableCell>
                                    <TableCell>{comment.rating}</TableCell>
                                    <TableCell>{comment.text}</TableCell>
                                    <TableCell>{comment.time}</TableCell>
                                    {userRole === 'admin' || userRole === 'superadmin' ? (
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleDeleteEvent(comment)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    ) : null}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{ mt: 2 }}>
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
