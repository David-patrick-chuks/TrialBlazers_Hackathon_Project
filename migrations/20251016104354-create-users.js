'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
    password: {
        type: Sequelize.STRING,
        allowNull: false
     },
      role:{
        type: Sequelize.ENUM(['Client', 'Runner', 'Admin']),
        allowNull: false
     },
     profileImage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      otp:{
       type: Sequelize.INTEGER,
       allowNull: false
      },
      otpExpiredAt: {
       type: Sequelize.INTEGER,
       allowNull: false
    },
      isVerified:{
       type: Sequelize.BOOLEAN,
        default: false,
        allowNull: false
     },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false
      },
     totalJobs: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
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
    await queryInterface.dropTable('Users');
  }
};