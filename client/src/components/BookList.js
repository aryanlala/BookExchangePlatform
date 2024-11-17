import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import BookDetailsModal from './BookDetailsModal';
import useBookStore from '../store/bookStore';
import '../styles/BookList.css';

const BookList = () => {
  const { books, loading, error } = useBookStore();
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Add these handlers
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <Container className={modalOpen ? 'blur-background' : ''}>
      {loading ? (
        <div className="loading">Loading books...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <Row className="g-4">
            {books.map((book) => (
              <Col key={book._id} md={3}>
                <Card 
                  className="h-100 book-card"
                  onClick={() => handleBookClick(book)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                      <p><strong>Author:</strong> {book.author}</p>
                      <p><strong>Genre:</strong> {book.genre}</p>
                      <p><strong>Condition:</strong> {book.condition}</p>
                      <p><strong>Location:</strong> {book.location}</p>
                      <p className={book.isAvailable ? 'text-success' : 'text-danger'}>
                        <strong>Status:</strong> {book.isAvailable ? 'Available' : 'Not Available'}
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Add the modal component */}
          <BookDetailsModal
            book={selectedBook}
            open={modalOpen}
            onClose={handleCloseModal}
          />
        </>
      )}
    </Container>
  );
};

export default BookList; 