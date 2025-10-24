'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      payerId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      receiverId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      description: {
       type: Sequelize.TEXT,
       allowNull: false
      },
      transactionId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      paymentStatus: {
        type: Sequelize.ENUM(['Pending', 'Paid', 'Failed']),
        allowNull: false
      },
      paymentMethod: {
         type: Sequelize.STRING,
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
    await queryInterface.dropTable('payments');
  }
};