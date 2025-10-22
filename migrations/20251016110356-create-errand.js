'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('errands', {
     id: {
             allowNull: false,
             primaryKey: true,
             type: Sequelize.UUID,
           },
           userId: {
             type: Sequelize.UUID,
             allowNull: false
           },
           title: {
             type: Sequelize.STRING,
             allowNull: false,
           },
           description: {
             type: Sequelize.TEXT,
             allowNull: false,
           },
           location: {
             type: Sequelize.STRING,
             allowNull: false
           },
           price: {
             type: Sequelize.FLOAT,
             allowNull: false
           },
           status:{
             type: Sequelize.ENUM(['Open', 'Assigned', 'Completed', 'Cancelled']),
             allowNull: false
           },
           assignedTo: {
             type: Sequelize.UUID,
             allowNull: true
           },
           startOTP: {
             type: Sequelize.STRING,
           },
           deliveryOTP: {
             type: Sequelize.STRING,
           },
           startOTPExpires: {
             type: Sequelize.STRING,
           },
           deliveryOTPExpires: {
             type: Sequelize.STRING,
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
    await queryInterface.dropTable('errands');
  }
};