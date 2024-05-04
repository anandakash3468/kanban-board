const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
require('dotenv').config()
const errorMiddleware = require("./middleware/error");
const cors = require("cors"); // Correctly require the cors module

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
app.use(cors()); // Use cors middleware

const user = require("./routes/userRoute");
const tasks = require("./routes/kanbanRoute");
app.use("/api/v1", user);
app.use("/api/v1/tasks", tasks);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
