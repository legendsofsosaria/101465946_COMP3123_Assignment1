# Assignment 1 TODO

## 1. Remaining Functional Requirements

- [x] Finish and test employee GET by ID
- [ ] Return `404 Not Found` when the employee doesn't exist.
- [x] Finish and test employee PUT update
- [ ] Validate input.
- [ ] Allow only permitted employee fields to be updated.
- [ ] Enforce per-user ownership.
- [x] Finish and test employee DELETE
- [ ] Use the required `eid` query parameter.
- [ ] Enforce per-user ownership.
- [ ] Return the appropriate HTTP status codes.
- [ ] Add and verify Helmet security middleware.
- [ ] Add and test rate limiting.
- [ ] Implement local logging
- [ ] Write logs to the required local `log` folder.
- [ ] Log relevant application events and errors.
- [ ] Avoid logging passwords, JWTs, or other sensitive information.
- [ ] Finish error handling
- [ ] Handle invalid input.
- [ ] Handle missing resources.
- [ ] Handle invalid MongoDB IDs.
- [ ] Handle unexpected server errors.
- [ ] Verify the health-check endpoint (`GET /health`).
- [ ] Run the full Postman regression test
- [ ] Test successful requests.
- [ ] Test validation failures.
- [ ] Test requests without authentication.
- [ ] Test invalid or expired JWTs.
- [ ] Test missing resources and invalid IDs.
- [ ] Test two-user authorization and employee ownership.

## 2. Submission Checklist

- [ ] GitHub repository link is ready.
- [ ] Project ZIP file is created.
- [ ] `node_modules` is removed from the ZIP.
- [ ] Postman collection is exported.
- [ ] README is complete.
- [ ] `.env.example` is included without real secrets.
- [ ] MongoDB screenshots are captured.
- [ ] Signup screenshots are captured.
- [ ] Login/JWT screenshots are captured.
- [ ] Employee CRUD screenshots are captured.
- [ ] Validation and error screenshots are captured.
- [ ] Rate-limiting screenshot is captured.
- [ ] Helmet/security evidence is captured where applicable.
- [ ] Health-check screenshot is captured.
- [ ] Local logging evidence is captured.
- [ ] Two-user authorization/ownership test is documented.
- [ ] Non-sensitive sample credentials for marking are included.
- [ ] Deployed API URL is included if applicable.

## 3. Minimum Functional Requirements Verification

- [x] Node.js
- [x] Express
- [x] MongoDB
- [x] Mongoose
- [ ] REST API — verify all required endpoints.
- [x] User signup
- [x] User login
- [x] Password hashing
- [x] JWT authentication
- [x] Employee CRUD — finish and test all operations.
- [x] User–employee relationship
- [x] Per-user employee visibility — tested with two accounts.
- [x] Per-user employee authorization — ownership filtering implemented and tested.
- [ ] Input validation — finish testing all cases.
- [ ] Helmet
- [ ] Rate limiting
- [ ] Error handling — final review and testing.
- [ ] Local logging
- [ ] Health-check URL — verify.
- [ ] Postman testing — complete full regression test.
- [ ] GitHub repository — verify final state.
- [ ] README — finish and verify.

## 4. Final Submission Checks

- [ ] Confirm all required endpoints work.
- [ ] Confirm users cannot view, update, or delete another user's employees.
- [ ] Confirm validation and error responses are appropriate.
- [ ] Confirm Helmet and rate limiting are active.
- [ ] Confirm local log files are being generated.
- [ ] Capture final screenshots after testing.
- [ ] Verify the README includes setup instructions and required documentation.
- [ ] Verify `.env.example` contains placeholder values only.
- [ ] Verify the Postman collection is complete and exported.
- [ ] Verify the ZIP contains the project files but excludes `node_modules`.
- [ ] Verify GitHub contains the final code.
- [ ] Verify sample marking credentials work and contain no real personal information.
- [ ] Complete the final submission.
