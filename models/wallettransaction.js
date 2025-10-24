const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/databases');

class WalletTransaction extends Model {}

WalletTransaction.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    walletId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'Wallets', key: 'id' }
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(['credit', 'debit']),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: true // Payment ID or other reference
    },
    status: {
      type: DataTypes.ENUM(['pending', 'completed', 'failed', 'cancelled']),
      allowNull: false,
      defaultValue: 'completed'
    },
    balanceBefore: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true
    },
    balanceAfter: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {}
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
    modelName: 'WalletTransactions',
    timestamps: true,
    indexes: [
      {
        fields: ['walletId']
      },
      {
        fields: ['reference']
      },
      {
        fields: ['type']
      },
      {
        fields: ['status']
      }
    ]
  }
);

module.exports = WalletTransaction;
