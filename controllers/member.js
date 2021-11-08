const Member = require("../models/member");
const Error404 = require("../middleware/errors/Error404");
const Error403 = require("../middleware/errors/Error403");
const Error500 = require("../middleware/errors/Error500");



/** GET /member/:name — returns this member */
module.exports.getMemberbyName = (req, res) => {
  Member.findOne({ name: req.params.name})
    .then((member) => {
      res.status(200).send(member);
    })
    .catch((err) => {
      console.log(err);
      throw new Error500('Member not found');
    })
};