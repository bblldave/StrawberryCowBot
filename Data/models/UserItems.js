module.exports = (sequelize, DataTypes) => {
  return sequelize.define("userItems", {
    userId: DataTypes.STRING,
    itemId: DataTypes.INTEGER,
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
  }, {
    timestamps: false
  });
};
