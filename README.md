# Donation-Management-System

# JWT Authentication with Spring Boot & React

This project demonstrates how to build a secure authentication system using **JWT (JSON Web Token)** in a full-stack application with **Spring Boot** for the backend and **React** for the frontend. JWT is used for secure token-based authentication, ensuring that users are authenticated before accessing protected resources.

## Table of Contents

1. [Project Overview](#project-overview)
2. [How JWT Works](#how-jwt-works)
3. [Frontend Setup](#frontend-setup)
4. [Backend Setup](#backend-setup)
5. [API Endpoints](#api-endpoints)
6. [Usage](#usage)
7. [Technologies](#technologies)
8. [Folder Structure](#folder-structure)

## Project Overview

This project contains both frontend and backend applications:

- **Frontend**: A React app where users can register, log in, and make donations.
- **Backend**: A Spring Boot app that provides JWT-based authentication and authorization, handles user registration and login, and manages donations.

### Features:

- **JWT Authentication**: Secure token-based authentication.
- **User Registration & Login**: Users can sign up and log in.
- **Donation Management**: Users can donate with transaction ID, amount, and month.
- **Protected Routes**: JWT tokens are required for accessing protected resources.

## How JWT Works

### What is JWT?

JSON Web Token (JWT) is a compact and self-contained way for securely transmitting information between parties as a JSON object. The information is digitally signed, so it can be verified and trusted.

JWT is commonly used in authentication systems because it allows the server to authenticate a user without maintaining session information on the server-side. Instead, the user's authentication details are embedded within the token, which is then sent to the server for verification.

### JWT Structure

A JWT is composed of three parts:

1. **Header**: Contains metadata about the token, such as the type (`JWT`) and the signing algorithm (e.g., HMAC SHA256 or RSA).
2. **Payload**: Contains the claims, which are statements about an entity (typically, the user) and additional data.
3. **Signature**: Used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't altered along the way.

A typical JWT looks like this:
Where:

- **Header**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
- **Payload**: `eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ`
- **Signature**: `SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

### JWT Authentication Flow

1. **User Login**:

   - The user sends their username and password to the backend in a login request.
   - The backend verifies the credentials against the database.
   - If the credentials are valid, the backend generates a JWT token and sends it back to the client.

2. **Accessing Protected Resources**:

   - For subsequent requests, the user includes the JWT token in the `Authorization` header as `Bearer <token>`.
   - The backend verifies the token, checking its validity (signature and expiration).
   - If the token is valid, the backend processes the request; otherwise, it returns an error (usually 401 Unauthorized).

3. **Token Expiration**:
   - JWT tokens are often set to expire after a certain period (e.g., 1 hour). After expiration, the user needs to log in again to get a new token.

### Example Flow in the Project

- **Login**: The user logs in by providing their username and password. If successful, the backend returns a JWT token.
- **Make a Donation**: The user needs to send the JWT token in the `Authorization` header (`Bearer <token>`) when making a donation request.
- **Access Donations**: The user can access their donation records only if they provide a valid JWT token.

## Frontend Setup

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **React**: The project is built using React.

### Steps to Set Up Frontend

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/security-jwt-react.git
   cd security-jwt-react
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   npm start
   ```

### Backend Setup

- Java 11 or later: Ensure you have JDK 11 or later installed. You can download it from here.
- MySQL: The project uses MySQL for storing user and donation data

### Steps to Set Up Backend

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/security-jwt-spring.git
   cd security-jwt-spring
   ```

2. **Configure MySQL Database:**

   ```bash
   CREATE DATABASE security_db;
   ```

3. **Configure application.propertied**

   Update the database connection details in src/main/resources/application.properties:

   ```bash
   spring.datasource.url=jdbc:mysql://localhost:3306/security_db
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.properties.hibernate.format_sql=true
   ```

4. **Build and Run the Backend**

   Build the application and run it using maven

   ```bash
   mvn spring-boot:run
   ```

## Api EndPoints

### 1. **POST** `/register`

Registers a new user with the provided `name`, `username`, and `password`.

#### Request Body

```json
{
  "name": "John Doe",
  "username": "johndoe",
  "password": "password123"
}
```

- 201 Created: User successfully registered.

- 400 Bad Request: Missing fields or invalid input.

### 1. **POST** `/login`

Authenticates the user and returns a JWT token. The user must provide their `username` and `password`.

#### Request Body

```json
{
  "username": "johndoe",
  "password": "password123"
}
```

- 200 OK: Returns a JWT token if login is successful.

- 401 Unauthorized: Invalid credentials.

### Example Response

```json
{
  "token": "your_jwt_token_here"
}
```

### 1. **POST** `/adddonation`

Allows the logged-in user to make a donation. The user must provide the `month`, `amount`, and `transactionID`. The request requires the `Authorization` header with the JWT token

#### Request Headers

```makefile
Authorization: Bearer <JWT_TOKEN>
```

### Request Body

```json
{
  "month": "January",
  "amount": 1000,
  "transactionID": "TX12345"
}
```

### Response

- 201 Created: Donation successfully added.
- 403 Forbidden: Invalid or expired JWT token.

### 1. **GET** `/getdonation`

Retrieves the donations made by the logged-in user. The request requires the `Authorization` header with the JWT token.

#### Request Headers

```makefile
Authorization: Bearer <JWT_TOKEN>
```

### Response

- 200 OK: Returns an array of donations made by the user.
- 403 Forbidden: Invalid or expired JWT token.

### Example Response

```json
[
  {
    "month": "January",
    "amount": 1000,
    "transactionID": "TX12345",
    "createdAt": "2024-01-15T12:34:56Z"
  },
  {
    "month": "February",
    "amount": 500,
    "transactionID": "TX12346",
    "createdAt": "2024-02-20T14:10:00Z"
  }
]
```

# Folder Structure

```bash
/frontend
  ├── /src
  │   ├── /components
  │   ├── /pages
  │   └── App.js
  ├── /public
  └── package.json

/backend
  ├── /src
  │   ├── /controller
  │   ├── /model
  │   ├── /repository
  │   ├── /security
  │   ├── /service
  │   └── Application.java
  ├── /resources
  │   └── application.properties
  └── pom.xml
```

## Developed By

- Asjad Samdani
