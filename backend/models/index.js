'use strict';

require('pg'); // Force Vercel to bundle the PostgreSQL driver
const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Explicitly require models for Vercel Serverless compatibility
db.Admin = require('./admin.js')(sequelize, Sequelize.DataTypes);
db.Article = require('./article.js')(sequelize, Sequelize.DataTypes);
db.Product = require('./product.js')(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
