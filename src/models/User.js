const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
    },
    acceptTerm: {

      type: DataTypes.BOOLEAN
    },
    role: {

      type: DataTypes.STRING,
      allowNull: false
    },
    verificationToken: {

      type: DataTypes.STRING,


    },
    verified: {

      type: DataTypes.DATE
    },
    resetToken: {
      type: DataTypes.STRING
    },
    resestTokenExpires: {

      type: DataTypes.DATE
    },
    passwordReset: { type: DataTypes.DATE },
    created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    update: { type: DataTypes.DATE },
    isVerified: {
      type: DataTypes.VIRTUAL,
      get() { return !!(this.verified || this.passwordReset) }
    }


  });
};
