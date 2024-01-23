"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.User, {
        foreignKey: "FirstUserId",
        as: "FirstUser",
      });
      Room.belongsTo(models.User, {
        foreignKey: "SecondUserId",
        as: "SecondUser",
      });
    }
  }
  Room.init(
    {
      FirstUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "FirstUserId is required" },
          notEmpty: { msg: "FirstUserId is required" },
        },
      },
      SecondUserId: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is required" },
          notEmpty: { msg: "Name is required" },
        },
      },
      turn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Turn is required" },
          notEmpty: { msg: "Turn is required" },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Status is required" },
          notEmpty: { msg: "Status is required" },
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      history: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "History is required" },
          notEmpty: { msg: "History is required" },
        },
      },
      winner: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
