const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/databases')

class Message extends Model {}

Message.init(
  {
    
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Messages', // We need to choose the model name
    timestamps: true
  },
);

module.exports = Message;