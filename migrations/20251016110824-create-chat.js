'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chats', {
     id: {
             type: Sequelize.UUID,
             allowNull: false,
             primaryKey: true
           },
           errandId: {
             type: Sequelize.UUID,
             allowNull: false
           },
           senderId: {
             type: Sequelize.UUID,
             allowNull: false
           },
           receiverId: {
             type: Sequelize.UUID,
             allowNull: false
           },
           message:{
             type: Sequelize.TEXT,
             allowNull: false
           },
           messageType:{
             type: Sequelize.ENUM,
             allowNull: false
           },
           isRead:{
             type: Sequelize.BOOLEAN,
             defaultValue: false
           },
           readAt:{
             type: Sequelize.DATE,
             allowNull: false
           },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chats');
  }
};