const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("quote", {
    userId: {
      type: DataTypes.INTEGER,
      allownull: false,
    },

    typeWork: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
