const { Sequelize, DataTypes, Model, UUIDV4 } = require('sequelize');
const sequelize = require('../database/databases')

class KYC extends Model {}

KYC.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        references: {model: 'Users', key: 'id'},
        allowNull: false
      },
      verificationType: {
        type: DataTypes.ENUM(['BVN', 'NIN']),
        allowNull: false
      },
      verificationId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      nepaBillUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      validationResults: {
        type: DataTypes.JSONB,
        allowNull: true
      },
      verificationReference: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM(['pending', 'approved', 'rejected', 'verified']),
        allowNull: false,
        defaultValue: 'pending'
      },
      rejectionReason: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      reviewedBy: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {model: 'Users', key: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'KYCs', // We need to choose the model name
    timestamps: true
  },
);

module.exports = KYC;