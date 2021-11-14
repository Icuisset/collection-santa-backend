/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const bcrypt = require("bcryptjs");
// eslint-disable-next-line no-unused-vars
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const Error400 = require("../middleware/errors/Error400");
const Error404 = require("../middleware/errors/Error404");
const Error409 = require("../middleware/errors/Error409");
const Error500 = require("../middleware/errors/Error500");

// eslint-disable-next-line no-multiple-empty-lines

/** GET /users/me - returns current user */
module.exports.findCurrentUser = (req, res, next) => {
  console.log(req.user._id);
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new Error404("Current user not found");
      }
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === "CastError") {
        throw new Error400("Current user Id is not valid");
      }
    })
    .catch(next);
};

/** POST /signup — creates a new user in SIGNUP */
module.exports.createUser = (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
    )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === "MongoError" && err.code === 11000) {
        throw new Error409("User exists already");
      } else {
        throw new Error500("User not created");
      }
    })
    .catch(next);
};

/** POST /signin - manages SIGNIN */
module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "super-strong-secret", {
        expiresIn: "7d",
      });
      res.cookie("token", token, { httpOnly: true });
      res.send({
        token,
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    })
    .catch(next);
};
