'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Create Wallets table
    await queryInterface.createTable('Wallets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      runnerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        unique: true
      },
      balance: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'NGN'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      lastTransactionAt: {
        type: Sequelize.DATE,
        allowNull: true
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

    // Create WalletTransactions table
    await queryInterface.createTable('WalletTransactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      walletId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Wallets', key: 'id' }
      },
      amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM(['credit', 'debit']),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM(['pending', 'completed', 'failed', 'cancelled']),
        allowNull: false,
        defaultValue: 'completed'
      },
      balanceBefore: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true
      },
      balanceAfter: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
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

    // Add indexes
    await queryInterface.addIndex('Wallets', ['runnerId'], { unique: true });
    await queryInterface.addIndex('WalletTransactions', ['walletId']);
    await queryInterface.addIndex('WalletTransactions', ['reference']);
    await queryInterface.addIndex('WalletTransactions', ['type']);
    await queryInterface.addIndex('WalletTransactions', ['status']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('WalletTransactions');
    await queryInterface.dropTable('Wallets');
  }
};
