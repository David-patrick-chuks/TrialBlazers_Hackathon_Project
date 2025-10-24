/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
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
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('Client', 'Runner'),
        allowNull: false
      },
      profileImage: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: true
      },
      otpExpiredAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      totalJobs: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
