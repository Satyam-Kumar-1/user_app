'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Assuming it's an auto-incrementing integer
    },
    name: DataTypes.STRING,
    email:{
      type:DataTypes.STRING,
      unique:true
    } ,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_image: {
      type: DataTypes.STRING,
      allowNull: true // Make profile_image nullable
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  
  return User;
};