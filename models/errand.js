const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/databases');
const { date } = require('joi');

class Errand extends Model {}

Errand.init(
  {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        references: {model: 'Users', key: 'id'},
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recieverNo:{
        type:DataTypes.UUID,
        refrences:{model:'runnerId', key: 'id'}
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      pickupAddress:{
        type:DataTypes.TEXT,
        allowNull:false,
      },
      deliveryAddress:{
        type:DataTypes.TEXT,
        allowNull:false,
      },
      pickupContact:{
        type:DataTypes.TEXT,
        allowNull:false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      status:{
        type: DataTypes.ENUM('Open', 'Assigned', 'Completed', 'Cancelled'),
        defaultValue: 'Open',
        allowNull: false
      },
      assignedTo: {
        type: DataTypes.UUID,
        references: {model: 'Users', key: 'id'},
        allowNull: true
      },
      startOTP: {
        type: DataTypes.STRING,
      },
      deliveryOTP: {
        type: DataTypes.STRING,
      },
      startOTPExpires: {
        type: DataTypes.STRING,
      },
      deliveryOTPExpires: {
        type: DataTypes.STRING,
      },
      attachments: {
        type: DataTypes.TEXT,
        allowNull: true,
         get() {
         const rawValue = this.getDataValue('attachments');
         return rawValue ? JSON.parse(rawValue) : null;
       },
        set(value) {
       this.setDataValue('attachments', JSON.stringify(value));
       }
      }
  },
  {
   
    sequelize,
    modelName: 'Errands', 
    timestamps: true
  },
);



module.exports = Errand;