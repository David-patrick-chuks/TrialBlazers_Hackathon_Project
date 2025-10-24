const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/databases')

class ErrandAssignment extends Model {}

ErrandAssignment.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      errandId: {
        type: DataTypes.UUID,
        references: {model: 'Errands', key: 'id'},
      },
      runnerId: {
        type: DataTypes.UUID,
        references: {model: 'Users', key: 'id'},
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected', 'Cancelled'),
        defaultValue: 'Pending'
      }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'errandAssignments', // We need to choose the model name
    timestamps: true
  },
);

module.exports = ErrandAssignment;