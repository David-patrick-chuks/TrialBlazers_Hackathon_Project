const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/databases');
const { date } = require('joi');

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
      recieverNo:{
        type:DataTypes.UUID,
        refrences:{model:'runnerId', key: 'id'}
      },
      instruction:{
        type:DataTypes.TEXT,
        allowNull:false
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected', 'Cancelled'),
        defaultValue: 'Pending'
      },
      location: {
        type: DataTypes.STRING,
        allowNull:false 
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      status:{
        type: DataTypes.ENUM('Open', 'Assigned', 'Completed', 'Cancelled'),
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

module.exports = Errand;