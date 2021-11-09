/* eslint-disable no-unused-vars */
const express = require('express');
const {
    celebrate,
    Joi
} = require('celebrate');

const router = express.Router();

const {
    getAllTeams,
    createTeam,
    deleteTeamByID
} = require('../controllers/teams');

router.get('/', getAllTeams);

router.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
    }),
}), createTeam);

router.delete('/:teamID',
    celebrate({
        params: Joi.object().keys({
            teamID: Joi.string(),
        }),
    }), deleteTeamByID);

module.exports = router;