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
    deleteMemberByID,
    getAllAvailableMembers,
    updateMemberByID
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

router.get('/available',
    celebrate({
        body: Joi.object().keys({
            teamid: Joi.string().required(),
        }),
    }), getAllAvailableMembers);

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

router.patch('/:memberID',
    celebrate({
        params: Joi.object().keys({
            memberID: Joi.string().required(),
        }),
        body: Joi.object().keys({
            name: Joi.string().required(),
        }),
    }), updateMemberByID);

module.exports = router;