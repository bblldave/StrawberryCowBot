const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "Data/database.sqlite",
});

const Users = require("./models/Users.js")(sequelize, Sequelize.DataTypes);
const CurrencyShop = require("./models/CurrencyShop.js")(
  sequelize,
  Sequelize.DataTypes
);
const UserItems = require("./models/UserItems.js")(
  sequelize,
  Sequelize.DataTypes
);

UserItems.belongsTo(CurrencyShop, { foreignKey: "itemId", as: "item" });

Reflect.defineProperty(Users.prototype, "addItem", {
  value: async (userId, item) => {
    const userItem = await UserItems.findOne({
      where: { userId: userId, itemId: item.id },
    });

    if (userItem) {
      userItem.amount += 1;
      return userItem.save();
    }

    return UserItems.create({
      userId: userId,
      itemId: item.id,
      amount: 1,
    });
  },
});

Reflect.defineProperty(Users.prototype, "getItems", {
  value: (id) => {
    return UserItems.findAll({
      where: { userId: id },
      include: ["item"],
    });
  },
});

module.exports = { Users, CurrencyShop, UserItems };
