# Project:

### Application Purpose:
This project is a RESTful Employee Management API built with Node.js, Express, MongoDB, and Mongoose. It allows users to register and log in,
then manage employee records through authenticated API requests.
The application includes user authentication, JWT-based authorization, input validation, employee ownership restrictions, security middleware,
rate limiting, and application local logs. 

### Technologies Used:
- Node.js: JavaScript runtime
- Express.js: REST API framework
- MongoDB: NoSQL database
- Mongoose: MongoDB object modeling
- JSON Web Token (JWT): Authentication and authorization
- bcrypt: Password hashing
- express-validator: Request validation
- Helmet: HTTP security headers
- express-rate-limit: API rate limiting
- Pino and pino-http: application and HTTP request logging
- dotenv: Environment variable configuration
- postman: API testing

## Project Structure
```aiignore
101465946_comp3123_assignment1/
├── controllers/
│   ├── employeeController.js
│   └── userController.js
├── logs/
│   ├── app.log
│   ├── error.log
│   └── security.log
├── middleware/
│   ├── auth.js
│   └── validateRequest.js
├── models/
│   ├── employee.js
│   └── user.js
├── postman/
│   └── Assignment1.postman_collection.json
├── routes/
│   ├── employees.js
│   └── users.js
├── utils/
│   └── logger.js
├── validators/
│   └── validationRules.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```
## Installation
#### Install the following before running the application:
- Node.js and npm
- MongoDB
- Git
- Postman (for API testing)

#### 1) Clone the Repository
Replace the placeholder with the URL of your GitHub repository

```aiignore
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```
#### 2) Install Dependencies
Run the following command in the project directory:

```npm install```

#### 3) Configure Environment Variables
Create a .env file in the project root using .env.example as a template.
Configure the required values: 

```aiignore
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=10m
MONGODB_URI=MONGODB_URI=mongodb://localhost:27017/comp3123_assignment1
```
Use your own MongoDB connection string if you are using MongoDB Atlas.

#### 4) Start MongoDB
If using a local MongoDB installation, ensure the MongoDB service is running before starting the application.
The default local connection string is:
```aiignore
mongodb://localhost:27017/comp3123_assignment1
```
If using MongoDB Atlas, configure MONGODB_URI in .env with your Atlas connection string and ensure your
database user and network access are properly configured.

#### 5) Start the application
Run the command:
```aiignore
node server.js
```
The server uses the port configured by SERVER_PORT, or port 3002 by default. 
Once started, the API will be available at:
```aiignore
http://localhost:3002
```

#### 6) Test the API
Open Postman and import the exported Postman collection included in the repository. 
Run the requests to test registration, login, employee CRUD operations,, input validation,
authentication, authorization, rate limiting, and the health-check endpoint.
For protected employee endpoints, first log-in and use the returned JWT in the authorization header.

## Configuration
The application uses environment variables to configure the server, database, authentication, and logging.
See above for help configuring .env variables.

## API
All endpoints are relative to: 
```aiignore
http://localhost:3002
```
#### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/user/signup` | Register a new user |
| POST | `/api/v1/user/login` | Log in and receive a JWT |

Signup accepts the required user registration fields, including username, email, and password.
Login accepts the supported username or email identifier and password.

#### Employee Endpoints

| Method | Endpoint                        | Description |
|--------|---------------------------------|-------------|
| POST | `/api/v1/emp/employees`         | Create a new employee |
| GET | `/api/v1/emp/employees`         | Retrieve all employees belonging to the logged-in user |
| GET | `/api/v1/emp/employees/{eid}`   | Retrieve an employee by ID |
| PUT | `/api/v1/emp/employees/{eid}`   | Update an employee by ID |
| DELETE | `/api/v1/emp/employees?eid=xxx` | Delete an employee by ID |

Signup accepts the required user registration fields, including username, email, and password.

Login accepts the supported username or email identifier and password.

#### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Reports application database connectivity |

## Authentication

The application uses JWT-based authentication to protect employee endpoints.

### Signup
A user submits registration details through POST /api/v1/user/signup. The password is hashed before the user record is stored in MongoDB.

### Login
A registered user submits their username OR email, and password through POST /api/v1/user/login.
When the credentials are valid, the API returns a JWT that can be used to authenticate subsequent requests.
Invalid credentials are rejected.

### Protected Employee Endpoints/Authorization
The application enforces per-user employee ownership.
Each employee record references its owning user through a user identifier stored in MongoDB. When an authenticated user requests an employee record, the application checks that the record belongs to that user.
The application applies ownership checks when retrieving, updating, and deleting employee records. Users cannot access or modify employee records belonging to other users.
When an employee cannot be found for the authenticated user, the API returns a not-found response rather than revealing another user's employee record.

## Security
Password Hashing
Passwords are hashed before being stored in MongoDB. Plaintext passwords are not stored in the users collection.

### JWT Authentication
JWTs are used to authenticate requests to protected employee endpoints. Tokens are verified by authentication middleware before the request proceeds.
Protected requests must include the JWT in the HTTP Authorization header using the bearer token.
The authentication middleware verifies the token and attaches the decoded user information to the request. Requests with missing or invalid tokens are rejected.

### Helmet
Helmet is enabled to set HTTP security headers that help protect the application against common web vulnerabilities.

### Rate Limiting
The application uses express-rate-limit to restrict the number of API requests accepted from an IP address within a configured time window.
The API limit is configured to allow 100 requests per 15-minute window. Requests exceeding the limit receive an HTTP 429 Too Many Requests response.

### Input Validation
The application uses express-validator to validate incoming request data. Invalid requests are rejected with appropriate validation responses before they reach the relevant controller logic.

### Environment Variables
Sensitive configuration, including the MongoDB connection string and JWT secret, is stored in environment variables rather than hardcoded in application files.
The .env file is excluded from version control.

## Logging
The application uses Pino and pino-http to record HTTP requests, application activity, errors, and security-related events.
Logs are stored locally in the logs/ directory. Logs were also excluded from version control.

### Log Files & Purpose
#### logs/app.log
- General application activity and HTTP request information

#### logs/error.log
- Application errors and unexpected failures

#### logs/security.log
- Authentication failures and security-related events

- The HTTP request logger records relevant request information, including the HTTP method, request path, response status, and request duration.
- Application logs record relevant successful operations and failures. Security logs record events such as missing or invalid JWTs and denied employee access.
- The log directory is created automatically when the logger is initialized.

## Health Check
The application provides a health-check endpoint to report whether the MongoDB connection is available.
#### URL:
```
GET /health
```
Successful response — HTTP 200 OK:
```

{
"status": "OK",
"database": "Connected"
}
```

If the MongoDB connection is unavailable, the endpoint returns HTTP 503 Service Unavailable with the following response:
```
{
"status": "Unavailable",
"database": "Disconnected"
}
```
This endpoint allows a client or monitoring tool to check the application's database connectivity without requiring authentication.