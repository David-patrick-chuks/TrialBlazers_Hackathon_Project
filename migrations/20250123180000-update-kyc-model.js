'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('KYCs', 'runnerId');
    await queryInterface.removeColumn('KYCs', 'nin');
    
    await queryInterface.addColumn('KYCs', 'userId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    });
    
    await queryInterface.addColumn('KYCs', 'verificationType', {
      type: Sequelize.ENUM('BVN', 'NIN'),
      allowNull: false
    });
    
    await queryInterface.addColumn('KYCs', 'verificationId', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
    await queryInterface.addColumn('KYCs', 'firstName', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('KYCs', 'lastName', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('KYCs', 'middleName', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('KYCs', 'dateOfBirth', {
      type: Sequelize.DATE,
      allowNull: true
    });
    
    await queryInterface.addColumn('KYCs', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('KYCs', 'gender', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('KYCs', 'address', {
      type: Sequelize.JSONB,
      allowNull: true
    });
    
    await queryInterface.addColumn('KYCs', 'image', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    
    await queryInterface.addColumn('KYCs', 'validationResults', {
      type: Sequelize.JSONB,
      allowNull: true
    });
    
    await queryInterface.addColumn('KYCs', 'verificationReference', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('KYCs', 'status', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected', 'verified'),
      allowNull: false,
      defaultValue: 'pending'
    });
    
    await queryInterface.changeColumn('KYCs', 'rejectionReason', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    
    await queryInterface.changeColumn('KYCs', 'reviewedBy', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('KYCs', 'userId');
    await queryInterface.removeColumn('KYCs', 'verificationType');
    await queryInterface.removeColumn('KYCs', 'verificationId');
    await queryInterface.removeColumn('KYCs', 'firstName');
    await queryInterface.removeColumn('KYCs', 'lastName');
    await queryInterface.removeColumn('KYCs', 'middleName');
    await queryInterface.removeColumn('KYCs', 'dateOfBirth');
    await queryInterface.removeColumn('KYCs', 'phoneNumber');
    await queryInterface.removeColumn('KYCs', 'gender');
    await queryInterface.removeColumn('KYCs', 'address');
    await queryInterface.removeColumn('KYCs', 'image');
    await queryInterface.removeColumn('KYCs', 'validationResults');
    await queryInterface.removeColumn('KYCs', 'verificationReference');
    
    await queryInterface.addColumn('KYCs', 'runnerId', {
      type: Sequelize.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    });
    
    await queryInterface.addColumn('KYCs', 'nin', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
    await queryInterface.changeColumn('KYCs', 'status', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      allowNull: false
    });
    
    await queryInterface.changeColumn('KYCs', 'rejectionReason', {
      type: Sequelize.TEXT,
      allowNull: false
    });
    
    await queryInterface.changeColumn('KYCs', 'reviewedBy', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    });
  }
};
