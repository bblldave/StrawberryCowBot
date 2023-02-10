const { DataTypes } = require("sequelize");

const PollQuestion = sequelize.define("PollQuestion", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = PollQuestion;
