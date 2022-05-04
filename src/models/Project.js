const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('project', {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
  },

    nameProject: {
      type: DataTypes.STRING,

      allowNull: false,
    },

    ubication: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    images: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    typeWork: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    beginDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
