/* eslint-disable no-unused-vars */
const express = require('express');

const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const {
    celebrate,
    Joi,
    errors
} = require("celebrate");
require("dotenv").config();

// Get all Environment variables
const {
    NODE_ENV,
    DB_CONNECT,
    PORT = 3000
} = process.env;

const app = express();

const corsOptions = {
    origin: "*",
    // credentials: true,
    optionSuccessStatus: 200,
};

app.use(express.json(), cors(corsOptions));
app.use((req, res, next) => {
    res.header({
        "Access-Control-Allow-Origin": "*"
    });
    next();
});
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(helmet());

const {
    requestLog,
    errorLog
} = require("./middleware/log/logger");

const Error404 = require("./middleware/errors/Error400");

const uri= DB_CONNECT;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

const membersRouter = require('./routes/members');

app.use("/members", membersRouter);

app.get("*", () => {
    throw new Error404("requested resources not found");
  });

app.listen(PORT, () => {
    // if everything works fine, the console will show which port the application is listening to
    console.log(`App listening at port ${PORT}`);
})