const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ratting", {
    rating: {
      type:DataTypes.STRING,
      allowNull: false,
    },
  });
};
