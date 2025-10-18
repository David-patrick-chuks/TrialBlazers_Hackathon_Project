const { Sequelize, DataTypes, Model, UUIDV4 } = require('sequelize');
const sequelize = require('../database/databases')

class Chat extends Model {}

Chat.init(
  {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      errandId: {
        type: DataTypes.UUID,
        references: {model: 'Errands', key: 'id'},
        allowNull: false
      },
      senderId: {
        type: DataTypes.UUID,
        references: {model: 'Users', key: 'id'}
      },
      receiverId: {
        type: DataTypes.UUID,
        references: {model: 'Users', key: 'id'}
      },
      message:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      messageType:{
        type: DataTypes.ENUM(['Text', 'Image', 'Location', 'System'])
      },
      isRead:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      readAt:{
        type: DataTypes.DATE,
        allowNull: false
      },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Chats', // We need to choose the model name
    timestamps: true
  },
);

module.exports = Chat;