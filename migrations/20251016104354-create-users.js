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
        allowNull: false,
        trim: true
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: true,
        lowercase: true,
        trim: true
      },
    password: {
        type: Sequelize.STRING,
        allowNull: false
     },
      role:{
        type: Sequelize.ENUM(['Client', 'Runner']),
        allowNull: false
     },
     profileImage: {
     type: Sequelize.JSON,
      defaultValue:{
        publicId: '',
       url: ''
      }
      },
      otp:{
       type: Sequelize.INTEGER,
      },
      otpExpiredAt: {
       type: Sequelize.DATE,
    },
      isVerified:{
       type: Sequelize.BOOLEAN,
        defaultValue: false
     },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
     totalJobs: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      },
      isAdmin: {
       type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      otpVerified: {
       type: Sequelize.BOOLEAN,
       defaultValue: false
      },
     token: {
        type: Sequelize.STRING,
        defaultValue: ''
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