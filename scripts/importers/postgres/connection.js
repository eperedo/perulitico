require('dotenv').config();
const { Model } = require('objection');
const Knex = require('knex');
const connection = require('./knexfile');

// Initialize knex.
const knex = Knex(connection);

Model.knex(knex);
