module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Shop",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
