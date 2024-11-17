import React from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Divider,
  Box
} from '@mui/material';

const BookDetailsModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <>
      <DialogTitle>
        <Typography variant="h5" component="h2">
          {book.title}
        </Typography>
        <Typography color="textSecondary" variant="subtitle1">
          by {book.author}
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
            {book.description || "No description available."}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            <strong>Genre:</strong> {book.genre}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Condition:</strong> {book.condition}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Location:</strong> {book.location}
          </Typography>
          <Typography 
            variant="body2" 
            color={book.isAvailable ? 'success.main' : 'error.main'}
          >
            <strong>Status:</strong> {book.isAvailable ? 'Available' : 'Not Available'}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </>
  );
};

export default BookDetailsModal;