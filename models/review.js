const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/databases')

class Review extends Model {}

Review.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      errandId: {
        type: DataTypes.UUID,
        references: {model: 'Errands', key: 'id'}
      },
      reviewerId: {
        type: DataTypes.UUID,
        references: {model: 'Users', key: 'id'}
      },
      revieweeId: {
        type: DataTypes.UUID,
        references: {model: 'Users', key: 'id'}
      },
      rating: {
        type: DataTypes.INTEGER,
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
    sequelize, 
    modelName: 'Reviews', 
    timestamps: true
  },
);

module.exports = Review;