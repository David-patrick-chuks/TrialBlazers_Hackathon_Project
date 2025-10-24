const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/databases');

class Wallet extends Model {}

Wallet.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    runnerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
      unique: true // Each runner can have only one wallet
    },
    balance: {
      type: DataTypes.DECIMAL(15, 2), // Supports up to 999,999,999,999.99
      allowNull: false,
      defaultValue: 0.00
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'NGN'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    lastTransactionAt: {
      type: DataTypes.DATE,
      allowNull: true
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
    sequelize,
    modelName: 'Wallets',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['runnerId']
      }
    ]
  }
);

module.exports = Wallet;
