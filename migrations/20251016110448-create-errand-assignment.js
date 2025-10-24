'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('errandAssignments', {
      id: {
              allowNull: false,
              primaryKey: true,
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV4
            },
            errandId: {
              type: Sequelize.UUID,
              allowNull: false
            },
            runnerId: {
              type: Sequelize.UUID,
              allowNull:false
            },
            amount: {
              type: Sequelize.FLOAT,
              allowNull: false,
            },
            message: {
              type: Sequelize.TEXT,
              allowNull: false,
            },
            status: {
              type: Sequelize.ENUM('Pending', 'Accepted', 'Rejected', 'Cancelled'),
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
    await queryInterface.dropTable('errandAssignments');
  }
};