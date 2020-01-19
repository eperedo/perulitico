const { Model } = require('objection');
const Knex = require('knex');
const connection = require('./knexfile');

const knex = Knex(connection);

Model.knex(knex);
