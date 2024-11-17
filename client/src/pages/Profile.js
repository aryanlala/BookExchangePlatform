import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Alert,
  Divider,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookDetailsModal from '../components/BookDetailsModal';

const Profile = () => {
  const [userBooks, setUserBooks] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  const [editFormData, setEditFormData] = useState({
    title: '',
    author: '',
    genre: '',
    condition: '',
    description: '',
    location: '',
    isAvailable: true
  });

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedBookForDetail, setSelectedBookForDetail] = useState(null);

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 'Fantasy', 'Romance', 'Thriller', 'Other'];
  const conditions = ['New', 'Like New', 'Very Good', 'Good', 'Fair', 'Poor'];
  const locations = ['Bangalore', 'Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad', 'Kolhapur', 'Ghaziabad'];

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const userResponse = await axios.get('http://localhost:8080/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(userResponse.data);

      const booksResponse = await axios.get('http://localhost:8080/api/users/my-books', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserBooks(booksResponse.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError(error.response?.data?.message || 'Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (event, book) => {
    event.stopPropagation();
    setSelectedBook(book);
    setEditFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      condition: book.condition,
      description: book.description,
      location: book.location,
      isAvailable: book.isAvailable
    });
    setOpenEditDialog(true);
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8080/api/books/${selectedBook._id}`,
        editFormData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      fetchUserProfile();
      setOpenEditDialog(false);
      setSelectedBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
      setError(error.response?.data?.message || 'Failed to update book');
    }
  };

  const handleDeleteBook = async (event, bookId) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8080/api/books/${bookId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        fetchUserProfile();
      } catch (error) {
        console.error('Error deleting book:', error);
        setError(error.response?.data?.message || 'Failed to delete book');
      }
    }
  };

  const handleBookClick = (book) => {
    setSelectedBookForDetail(book);
    setDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedBookForDetail(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ 
      mt: 4,
      filter: detailModalOpen ? 'blur(4px)' : 'none',
      transition: 'filter 0.3s ease',
    }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1">
          Username: {userData?.username}
        </Typography>
        <Typography variant="body1">
          Email: {userData?.email}
        </Typography>
        <Typography variant="body1">
          Member since: {new Date(userData?.createdAt).toLocaleDateString()}
        </Typography>
      </Paper>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          My Listed Books
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {userBooks.length === 0 ? (
          <Alert severity="info">
            You haven't listed any books yet.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {userBooks.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book._id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }
                  }}
                  onClick={() => handleBookClick(book)}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {book.title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      by {book.author}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        Genre: {book.genre}
                      </Typography>
                      <Typography variant="body2">
                        Location: {book.location}
                      </Typography>
                      <Typography variant="body2">
                        Condition: {book.condition}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: book.isAvailable ? 'success.main' : 'error.main',
                          fontWeight: 'bold',
                          mt: 1
                        }}
                      >
                        {book.isAvailable ? '✓ Available' : '× Not Available'}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 2, mt: 'auto', position: 'relative', zIndex: 1 }}>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton 
                        onClick={(e) => handleEditClick(e, book)}
                        color="primary"
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.04)'
                          }
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={(e) => handleDeleteBook(e, book._id)}
                        color="error"
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(211, 47, 47, 0.04)'
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Dialog 
        open={detailModalOpen} 
        onClose={handleCloseDetailModal}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
            zIndex: 1300
          }
        }}
      >
        <BookDetailsModal
          book={selectedBookForDetail}
          onClose={handleCloseDetailModal}
        />
      </Dialog>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              value={editFormData.title}
              onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
            />
            <TextField
              label="Author"
              fullWidth
              value={editFormData.author}
              onChange={(e) => setEditFormData({ ...editFormData, author: e.target.value })}
            />
            <TextField
              select
              label="Genre"
              fullWidth
              value={editFormData.genre}
              onChange={(e) => setEditFormData({ ...editFormData, genre: e.target.value })}
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Condition"
              fullWidth
              value={editFormData.condition}
              onChange={(e) => setEditFormData({ ...editFormData, condition: e.target.value })}
            >
              {conditions.map((condition) => (
                <MenuItem key={condition} value={condition}>{condition}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Location"
              fullWidth
              value={editFormData.location}
              onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
            >
              {locations.map((location) => (
                <MenuItem key={location} value={location}>{location}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={editFormData.description}
              onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 