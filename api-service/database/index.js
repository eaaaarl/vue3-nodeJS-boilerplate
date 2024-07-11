const knexConfig = require('./config'); 
const knex = require("knex")(knexConfig);

module.exports = knex;
