/* eslint-disable no-unused-vars */
const Team = require("../models/team");
const Error404 = require("../middleware/errors/Error404");
const Error403 = require("../middleware/errors/Error403");
const Error500 = require("../middleware/errors/Error500");



/** GET /teams — returns all teams */

module.exports.getAllTeams = (req, res) => {
  Team.find({})
    .then((teams) => {
      if (!teams) {
        throw new Error404('No Teams found!');
      }
      res.status(200).send(teams);
    })
    .catch((err) => {
      console.log(err);
      throw new Error500('Teams not found');
    })
};

/**POST /teams - create a new team */
module.exports.createTeam = (req, res) => {
  const {
    name
  } = req.body;
  Team.create({
      name
    })
    .then((team) => {
      if (!team) {
        throw new Error404('Team not created');
      }
      res.status(200).send(team);
    })
    .catch((err) => {
      console.log(err);
      throw new Error500('Team not created');
    })
};

/** DELETE /teams/:teamID — delete a team by its name*/
module.exports.deleteTeamByID = (req, res) => {
  const {
    teamID
  } = req.params;
  Team.findOneAndDelete({
      _id : teamID
    })
    .then((team) => {
      if (!team) {
        throw new Error404('Team ID is not valid');
      }
      res.status(200).send({
        message: "Team has been deleted",
        data: team
      });
    })
    .catch((err) => {
      console.log(err);
      throw new Error500('Team not found');
    })
};