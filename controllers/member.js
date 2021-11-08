const Member = require("../models/member");
const Error404 = require("../middleware/errors/Error404");
const Error403 = require("../middleware/errors/Error403");
const Error500 = require("../middleware/errors/Error500");



/** GET /:team/members/:name — returns a member by his name in a team */
module.exports.getMemberbyName = (req, res) => {
  const {
    teamname
  } = req.params.team;
  const {
    membername
  } = req.params.name;
  Member.findOne({
      team: teamname,
      name: membername
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

/**GET /:team/members - returns all members of a team */
module.exports.getAllMembers = (req, res) => {
  const {
    teamname
  } = req.params.team;
  Member.find({
      team: teamname,
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

/**POST /:team/members - create a new member */
module.exports.createMember = (req, res) => {
  const {
    teamname
  } = req.params.team;
  const {
    membername
  } = req.body;
  Member.create({
      team: teamname,
      name: membername,
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

/** DELETE /:team/members/:name — delete a member by his name in a team */
module.exports.deleteMemberbyName = (req, res) => {
  const {
    teamname
  } = req.params.team;
  const {
    membername
  } = req.params.name;
  Member.findOneAndDelete({
      team: teamname,
      name: membername
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