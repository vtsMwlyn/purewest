'use strict';

const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

const mysql2 = require('mysql2');

let sequelizeOptions = { ...config, dialectModule: mysql2 };

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], sequelizeOptions);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, sequelizeOptions);
}

// Explicitly require models for Vercel Serverless compatibility
db.Admin = require('./admin.js')(sequelize, Sequelize.DataTypes);
db.Article = require('./article.js')(sequelize, Sequelize.DataTypes);
db.Product = require('./product.js')(sequelize, Sequelize.DataTypes);
db.LabTest = require('./labTest.js')(sequelize, Sequelize.DataTypes);
db.Testimonial = require('./testimonial.js')(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
