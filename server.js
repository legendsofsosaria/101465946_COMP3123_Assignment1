const express = require('express')
const employeeRoutes = require("./routes/employees")
const userRoutes = require("./routes/users")
const mongoose = require('mongoose')
const dotenv = require('dotenv')


dotenv.config();

const app = express()
const SERVER_PORT = process.env.SERVER_PORT || 3001
const CONNECTION_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/comp3123_assignment1'

app.use(express.json())
app.use(express.urlencoded())

mongoose.connect(CONNECTION_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeeRoutes);

app.route("/")
    .get((req, res) => {
        res.send("<h1>Assignment 1</h1>")
    });

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
});