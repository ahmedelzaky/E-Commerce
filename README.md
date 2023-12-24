# E-Commerce Project

This repository contains an E-Commerce application built for a Database course. The project utilizes React with Vite for the front-end, Spring Boot for the back-end, and PostgreSQL as the database. The application allows users to browse products, add items to the cart, and complete the purchase.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Demo](#demo)
- [Installation](#installation)
- [License](#license)

## Features

- User authentication and authorization.
- Product browsing with detailed information.
- Shopping cart functionality.
- Secure checkout process.
- Order history and tracking.
- Admin panel for product and order management.

## Technologies Used

### Front-end:

- React with Vite
- React Router
- Redux for state management
- Axios for API communication
- React React Bootstrap (Front Panel)
- Material-UI for UI components (Dashboard)

### Back-end:

- Spring Boot
- Spring Security for authentication
- JWT
- Spring Data JPA for data access
- RESTful API design

### Database:

- PostgreSQL
### Demo

- [LiveDemo](https://e-commerce-git-frontend-ahmedelzaky.vercel.app/)

### Installation

To run this project locally, follow the instructions below.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ahmedelzaky/E-Commerce.git
   ```

2. Database Configuration:

   Create a PostgreSQL database and update the application.yaml file in the backend directory with your database configuration.

3. Front-end Configuration:

   Create a .env file in the frontend directory and set the Vite environment variable:

   ```bash
   VITE_APP_API = http://localhost:8080/api
   ```

4. Backend

   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

5. Frontend

   ```bash
   cd E-Commerce
   cd frontend
   npm install
   npm run dev
   ```

# License

- This project is licensed under the MIT License.
