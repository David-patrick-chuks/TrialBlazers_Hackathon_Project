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
      runnerId: {
        type: DataTypes.UUID,
        references: {model: 'Users', key: 'id'}
      },
      nin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nepaBillUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM(['pending', 'approved', 'rejected']),
        allowNull: false
      },
      rejectionReason: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      reviewedBy: {
        type: DataTypes.UUID,
        allowNull: false,
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