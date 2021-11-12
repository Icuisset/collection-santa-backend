/* eslint-disable no-unused-vars */
const express = require("express");
const { celebrate, Joi } = require("celebrate");

const router = express.Router();

const {
  getMemberByID,
  getAllTeamMembers,
  createMember,
  deleteMemberByID,
  getAllAvailableMembers,
  updateMemberByID,
  updateMemberGiftee,
  updateMemberAvailability,
} = require("../controllers/members");

router.get(
  "/:memberID",
  celebrate({
    params: Joi.object().keys({
      memberID: Joi.string().required(),
    }),
  }),
  getMemberByID
);

router.get("/", getAllTeamMembers);

router.get(
  "/available",
  celebrate({
    body: Joi.object().keys({
      teamid: Joi.string().required(),
    }),
  }),
  getAllAvailableMembers
);

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      teamid: Joi.string(),
    }),
  }),
  createMember
);

router.delete(
  "/:memberID",
  celebrate({
    params: Joi.object().keys({
      memberID: Joi.string().required(),
    }),
  }),
  deleteMemberByID
);

router.patch(
  "/giftee",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      _id: Joi.string().required(),
    }),
  }),
  updateMemberGiftee
);

router.patch(
  "/availability",
  celebrate({
    body: Joi.object().keys({
      _id: Joi.string().required(),
    }),
  }),
  updateMemberAvailability
);

module.exports = router;
