/* eslint-disable no-unused-vars */
const Member = require("../models/member");
const Error404 = require("../middleware/errors/Error404");
const Error403 = require("../middleware/errors/Error403");
const Error500 = require("../middleware/errors/Error500");



/** GET /members/:memberID — returns a member by his ID */
module.exports.getMemberByID = (req, res) => {
  const {
    memberID
  } = req.params;
  Member.findOne({
      _id : memberID
    })
    .then((member) => {
      if (!member) {
        throw new Error404('Member name is not valid');
      }
      res.status(200).send(member);
    })
    .catch((err) => {
      console.log(err);
      throw new Error500('Member not found');
    })
};

/**GET /members - returns all members of a team */
module.exports.getAllTeamMembers = (req, res) => {
  const {
    teamid
  } = req.body;
  if (teamid) {
  Member.find({
      teamid,
    })
    .then((members) => {
      if (!members) {
        throw new Error404('No Members found in this team');
      }
      res.status(200).send(members);
    })
    .catch((err) => {
      console.log(err);
      throw new Error500('Members not found');
    })
  }
  else {
    Member.find({})
    .then((members) => {
      if (!members) {
        throw new Error404('No Members found in this team');
      }
      res.status(200).send(members);
    })
    .catch((err) => {
      console.log(err);
      throw new Error500('Members not found');
    })
  }
};

/**POST /members - create a new member */
module.exports.createMember = (req, res) => {
  const {
    teamid,
    name
  } = req.body;
  Member.create({
      teamid,
      name,
      available: true
    })
    .then((member) => {
      if (!member) {
        throw new Error404('Member not created');
      }
      res.status(200).send(member);
    })
    .catch((err) => {
      console.log(err);
      throw new Error500('Member not created');
    })
};

/** DELETE /members/:memberID — delete a member by ID */
module.exports.deleteMemberByID = (req, res) => {
  const {
    memberID
  } = req.params;
  Member.findOneAndDelete({
   _id : memberID
    })
    .then((member) => {
      if (!member) {
        throw new Error404('Member name is not valid');
      }
      res.status(200).send({
        message: "Member has been deleted",
        data: member
      });
    })
    .catch((err) => {
      console.log(err);
      throw new Error500('Member not found');
    })
};