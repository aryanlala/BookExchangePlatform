import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Grid,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BookDetailsModal = ({ book, open, onClose }) => {
  if (!book) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
        },
        '& .MuiDialogContent-root': {
          p: 3
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, pb: 0 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div">
            {book.title}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              by {book.author}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Genre
              </Typography>
              <Chip 
                label={book.genre} 
                size="small" 
                sx={{ mt: 0.5 }}
              />
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Condition
              </Typography>
              <Chip 
                label={book.condition} 
                size="small" 
                sx={{ mt: 0.5 }}
              />
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Location
              </Typography>
              <Chip 
                label={book.location} 
                size="small" 
                sx={{ mt: 0.5 }}
              />
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Status
              </Typography>
              <Chip 
                label={book.isAvailable ? 'Available' : 'Not Available'}
                color={book.isAvailable ? 'success' : 'error'}
                size="small" 
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Owner
              </Typography>
              <Typography variant="body1">
                {book.owner?.username || 'Unknown'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Description
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>
                {book.description || 'No description available'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailsModal; 