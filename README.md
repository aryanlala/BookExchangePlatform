# Book Exchange Platform

A full-stack web application that facilitates book sharing and exchange within a community. Users can list their books, search for available books, and manage their book inventory.

## Features

- **User Authentication**
  - Secure signup and login functionality
  - JWT-based authentication
  - Protected routes for authenticated users

- **Book Management**
  - Add new books to the platform
  - View all available books
  - Search books by title, author, or genre
  - Detailed book information including:
    - Title
    - Author
    - Genre
    - Condition
    - Location
    - Availability status
    - Description

- **Interactive UI**
  - Responsive design for all screen sizes
  - Material-UI components
  - Expandable book cards with detailed descriptions
  - Real-time search functionality

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- Axios for API calls
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Bcrypt for password hashing

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. **Clone the repository**
```
git clone <repository-url>
cd book-exchange-platform
```

2. **Set up the backend**
```
cd server
npm install

# Create a .env file in the server directory with the following variables:
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
```

3. **Set up the frontend**
```
cd client
npm install
```

## Running the Application

1. **Start the backend server**
```
cd server
npm start
# Server will run on http://localhost:5000
```

2. **Start the frontend development server**
```
cd client
npm start
# Client will run on http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get specific book
- `POST /api/books` - Add a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

## Database Schema

### User Model
```
{
  username: String,
  email: String,
  password: String (hashed),
  createdAt: Date
}
```

### Book Model
```
{
  title: String,
  author: String,
  genre: String,
  condition: String,
  location: String,
  description: String,
  isAvailable: Boolean,
  owner: ObjectId (ref: User),
  createdAt: Date
}
```

## Troubleshooting

Common issues and their solutions:

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running locally
   - Check if connection string is correct in .env file
   - Verify network connectivity

2. **JWT Token Issues**
   - Clear browser cookies and local storage
   - Ensure JWT_SECRET is properly set in .env
   - Check token expiration time
