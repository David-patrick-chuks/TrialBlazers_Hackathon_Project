const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/databases')

class RunnerApplication extends Model {}

RunnerApplication.init(
  {
  id: {
     primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  runnerId: {
     type: DataTypes.UUID,
     allowNull: false
  },
  errandId: {
    type: DataTypes.UUID,
    allowNull: false
  },
    status: {
    type: DataTypes.ENUM(['Pending', 'Accepted', 'Rejected']),
    allowNull: false,
    defaultValue: 'Pending'
  },
    bidPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
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
    modelName: 'runnerApplications', // We need to choose the model name
    timestamps: true
  },
);

module.exports = RunnerApplication;