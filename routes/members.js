/* eslint-disable no-unused-vars */
const express = require('express');
const {
    celebrate,
    Joi
} = require('celebrate');

const router = express.Router();

const {
    getMemberbyName,
    getAllMembers,
    createMember,
    deleteMemberbyName
} = require('../controllers/members');

router.get('/:team', celebrate({
    params: Joi.object().keys({
        team: Joi.string().required(),
    }),
}), getAllMembers);

router.get('/:team/:name',
    celebrate({
        params: Joi.object().keys({
            team: Joi.string().required(),
            name: Joi.string().required()
        }),
    }), getMemberbyName);

router.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        team: Joi.string()
    }),
}), createMember);

router.delete('/:team/:name',
    celebrate({
        params: Joi.object().keys({
            team: Joi.string().required(),
            name: Joi.string().required()
        }),
    }), deleteMemberbyName);

module.exports = router;