/* eslint-disable no-unused-vars */
const express = require('express');
const {
    celebrate,
    Joi
} = require('celebrate');

const router = express.Router();

const {
    getMemberByID,
    getAllTeamMembers,
    createMember,
    deleteMemberByID
} = require('../controllers/members');

router.get('/:memberID', celebrate({
    params: Joi.object().keys({
        memberID: Joi.string().required(),
    }),
}), getMemberByID);

router.get('/',
    celebrate({
        body: Joi.object().keys({
            teamid: Joi.string().required(),
        }),
    }), getAllTeamMembers);

router.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        teamid: Joi.string()
    }),
}), createMember);

router.delete('/:memberID',
    celebrate({
        params: Joi.object().keys({
            memberID: Joi.string().required(),
        }),
    }), deleteMemberByID);

module.exports = router;