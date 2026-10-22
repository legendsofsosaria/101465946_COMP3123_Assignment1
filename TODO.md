1. Project setup and database
   [x] User and Employee Mongoose models created
   [x] Connect to MongoDB Atlas using the required database name `comp3123_assignment1`
   [x] Organize routes, controllers, models, middleware and configuration
   [x] Set up `.env` and `.env example` for `MONGODB_URI`, `JWT_SECRET` and `PORT`
   [x] Ensure `.env`, `node_modules/` and sensitive files are ignored
   [ ] Create and test `GET /health`

2. User registration and login
   [x] Implement `POST /api/v1/user/signup`
   [x] Hash passwords using bcrypt before saving
   [x] Handle duplicate usernames and emails
   [x] Validate email format and password requirements
   [x] Implement `POST /api/v1/user/login`
   [x] Support login with username OR email plus password
   [x] Generate and return a JWT after successful login
   [x] Never return the stored password hash in API responses
   [x] Return the required status codes: signup `201`, login `200`

3. JWT authentication middleware
   [x] Read tokens from `Authorization: Bearer <jwt>`
   [ ] Verify JWT signatures
   [x] Reject requests without a token
   [x] Reject invalid and expired tokens
   [x] Identify the authenticated user from the token
   [ ] Protect all employee endpoints with authentication middleware

4. Employee CRUD endpoints
   [ ] `POST /api/v1/emp/employees` — create an employee (201)
   [ ] `GET /api/v1/emp/employees` — list the logged-in user's employees (200)
   [ ] `GET /api/v1/emp/employees/:eid` — retrieve one owned employee (200)
   [ ] `PUT /api/v1/emp/employees/:eid` — update one owned employee (200)
   [ ] `DELETE /api/v1/emp/employees?eid=xxx` — delete one owned employee (204)
   [ ] Use appropriate JSON request and response formats
   [ ] Handle nonexistent employee IDs and invalid ObjectIds
   [ ] Verify the exact success status codes required by the assignment

5. Employee ownership and authorization
   [ ] Assign `user` from the authenticated user, not from client input
   [ ] Ensure the owner is an existing user
   [ ] Filter employee lists by the authenticated user's ID
   [ ] Only retrieve employees belonging to that user
   [ ] Only update employees belonging to that user
   [ ] Only delete employees belonging to that user
   [ ] Create two test users, each with their own employees
   [ ] Verify User A cannot read, update or delete User B's employees
   [ ] Repeat the ownership tests in the opposite direction

6. Input validation and error handling
   [ ] Validate username, email and password
   [ ] Validate names, email, position, salary, joining date and department
   [ ] Reject missing required fields
   [ ] Reject invalid or inappropriate salary values
   [ ] Reject invalid dates
   [ ] Validate MongoDB ObjectId values
   [ ] Return a useful error for duplicate user records
   [ ] Handle malformed JSON and unexpected input
   [ ] Implement consistent, centralized JSON error handling
   [ ] Use appropriate 400, 401, 403/404, 409, 429 and 500 responses
   [ ] Do not expose stack traces, secrets or database credentials

7. Security features
   [ ] Install and enable Helmet
   [ ] Add rate limiting to signup and login
   [ ] Consider rate limiting general API traffic too
   [ ] Test that exceeding the limit returns `429 Too Many Requests`
   [ ] Keep credentials and JWT secrets in environment variables
   [ ] Create `.env.example` with placeholder values only
   [ ] Validate and sanitize user-controlled input appropriately

8. Local application logging
   [ ] Log server startup
   [ ] Log request method, path, timestamp and response status
   [ ] Log authentication outcomes without exposing credentials
   [ ] Log validation, authorization and application errors
   [ ] Store logs locally in a log file or directory
   [ ] Never log passwords, full JWTs or database secrets
   [ ] Keep sample logs or screenshots showing logging works

9. Postman testing
   [x] Test valid signup
   [x] Test duplicate username and email
   [x] Test invalid email, password and missing fields
   [x] Test username login and email login
   [x] Test invalid and missing credentials
   [x] Test valid, missing, invalid and expired tokens
   [ ] Test valid employee creation and invalid request bodies
   [ ] Test listing, retrieving, updating and deleting employees
   [ ] Test two-user ownership and cross-user access rejection
   [ ] Test rate limiting
   [ ] Test the health endpoint
   [ ] Export the Postman collection

10. README and GitHub
    [ ] Explain the application and technologies
    [ ] Document project structure
    [ ] Explain installation, environment setup and startup
    [ ] Document every required endpoint and method
    [ ] Explain JWT authentication and protected endpoints
    [ ] Explain how employee ownership is enforced
    [ ] Document password hashing, Helmet, rate limiting and validation
    [ ] Document logging and the health endpoint
    [ ] Make regular commits with meaningful messages
    [ ] Include source code, README, `.env.example`, `.gitignore` and Postman collection
    [ ] Check that no secrets or real credentials were committed

11. Screenshots and final submission
    [ ] Capture database and collection evidence
    [ ] Show users and hashed passwords
    [ ] Show employees and their owner references
    [ ] Capture successful signup
    [ ] Capture login and JWT evidence
    [ ] Capture employee CRUD operations
    [ ] Capture validation and error responses
    [ ] Capture rate-limiting evidence
    [ ] Capture security-header evidence where applicable
    [ ] Capture the health-check response
    [ ] Capture local logging evidence
    [ ] Capture two-user authorization test results
    [ ] Provide safe test credentials for marking
    [ ] Create project ZIP without `node_modules/`
    [ ] Verify GitHub repository link and commit history
    [ ] Check the submission against Brightspace's actual requirements