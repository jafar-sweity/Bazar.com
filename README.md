# Bazar.com: A Multi-tier Online Book Store

This project aims to implement Bazar.com, the world's smallest book store, with a two-tier web design employing microservices. The front-end tier accepts user requests, while the back-end consists of a catalog server and an order server. This README will guide you through setting up and testing the system.

## Project Structure

The project consists of three main components:

1. **Frontend**: Handles user requests and communicates with backend services.
2. **Catalog Server**: Manages the catalog of books and supports queries and updates.
3. **Order Server**: Handles purchase requests and updates stock accordingly.

Each component is implemented as a microservice and communicates with others via HTTP REST calls.

## Prerequisites

Before running the project, ensure you have the following installed:

- Docker
- Docker Compose
- Node.js (for local development)

## Setup and Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/jafar-sweity/Bazar.com.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Bazar
   ```

3. Build the Docker images and start the containers:

   ```bash
   docker-compose up --build
   ```

4. The system should now be running on Docker containers. You can access the frontend at `http://localhost:3000`.

## Testing the APIs using api test tool

You can test the APIs using tools like Postman or RapidAPI. Here are the endpoints available:

1. **Search Books by Topic**:

   - Endpoint: `http://catalog-server:4000/catalog_server/query`
   - Example: `http://localhost:4000/catalog_server/query?topic=distributed%20systems`

2. **Get Book Information**:

   - Endpoint: `http://catalog-server:4000/catalog_server/query`
   - Example: `http://localhost:4000/catalog_server/query?id=2`

3. **Purchase Book**:

   - Endpoint: `http://order-server:5000/order_server/purchase`
   - Example: `http://localhost:5000/order_server/purchase/2`


## Sample Outputs

- For successful purchases, you will receive a message confirming the purchase along with details.
- For unsuccessful purchases (Book not found, out of stock), appropriate error messages will be returned.

## Additional Notes

- The project is designed to run on Linux Docker containers. Ensure Docker is properly configured on your system.
- The system uses simple text files  databases to maintain persistent data.
## Node.js, Express.js, and Axios Usage
-   The backend services in this project are built using Node.js and Express.js. Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

-   Axios is used to send HTTP requests from one server to another in this project. Axios is a promise-based HTTP client for the browser and Node.js, which allows you to make asynchronous HTTP requests to REST endpoints.
## Contributors

- [jafar fuad sweity]
- [mohammad bdair]


