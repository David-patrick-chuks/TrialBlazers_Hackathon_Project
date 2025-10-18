const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/databases');
const User = require('./users');
const ErrandAssignment = require('./errandassignment');
const Payment = require('./payment');
const Review = require('./review');

class Errand extends Model {}

Errand.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        references: {model: 'Users', key: 'id'},
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      status:{
        type: DataTypes.ENUM(['Open', 'Assigned', 'Completed', 'Cancelled']),
        defaultValue: 'Open',
        allowNull: false
      },
      assignedTo: {
        type: DataTypes.UUID,
        references: {model: 'Users', key: 'id'},
        allowNull: true
      },
      startOTP: {
        type: DataTypes.STRING,
      },
      deliveryOTP: {
        type: DataTypes.STRING,
      },
      startOTPExpires: {
        type: DataTypes.STRING,
      },
      deliveryOTPExpires: {
        type: DataTypes.STRING,
      },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Errands', // We need to choose the model name
    timestamps: true
  },
);

Errand.belongsTo(User, {foreignKey: 'userId', as: 'poster'});
Errand.hasMany(ErrandAssignment, {foreignKey: 'errandId'});
Errand.hasOne(Payment, {foreignKey: 'errandId'});
Errand.hasOne(Review, {foreignKey: 'errandId'});


module.exports = Errand;