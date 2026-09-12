'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LabTest extends Model {
    static associate(models) {
      // define association here
    }
  }
  LabTest.init({
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    reference: DataTypes.STRING,
    sample_id: DataTypes.STRING,
    sampled_at: DataTypes.DATE,
    analyzed_at: DataTypes.DATE,
    method: DataTypes.STRING,
    signed_by: DataTypes.STRING,
    pdf_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LabTest',
  });
  return LabTest;
};
