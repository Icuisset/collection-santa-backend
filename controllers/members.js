/* eslint-disable no-unused-vars */
const Member = require("../models/member");
const Error404 = require("../middleware/errors/Error404");
const Error403 = require("../middleware/errors/Error403");
const Error500 = require("../middleware/errors/Error500");



/** GET /members/:team/:name — returns a member by his name in a team */
module.exports.getMemberbyName = (req, res) => {
  const {
    team
  } = req.params.team;
  const {
    name
  } = req.params.name;
  Member.findOne({
      team,
      name,
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

/**GET /members/:team - returns all members of a team */
module.exports.getAllMembers = (req, res) => {
  const {
    teamname
  } = req.params.team;
  Member.find({
      team : teamname,
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
};

/**POST /members - create a new member */
module.exports.createMember = (req, res) => {
  const {
    team,
    name
  } = req.body;
  Member.create({
      team,
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

/** DELETE /members/:team/:name — delete a member by his name in a team */
module.exports.deleteMemberbyName = (req, res) => {
  const {
    team,
    name
  } = req.params;
  Member.findOneAndDelete({
      team,
      name
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