

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with the User model
      Image.belongsTo(models.User, { foreignKey: 'user_id' }); // Assumes a User model exists
    }
    
  }
  Image.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Assuming it's an auto-incrementing integer
    },
    user_id: DataTypes.INTEGER,
    image_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};