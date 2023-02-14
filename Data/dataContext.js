const { Collection } = require("discord.js");
const { Users, CurrencyShop } = require("../Data/dbObjects.js");
const { Op } = require('sequelize');

class DataContext {
  constructor() {
    this.currency = new Collection();
  }

  async addBalance(id, amount) {
    const user = this.currency.get(id);

    if (user) {
      user.balance += Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ userId: id, balance: amount });
    this.currency.set(id, newUser);

    return newUser;
  }

  getBalance(id) {
    const user = this.currency.get(id);
    return user ? user.balance : 0;
  }

  async setCurrency() {
    const storedBalances = await Users.findAll();
    storedBalances.forEach((b) => this.currency.set(b.userId, b));
  }

  async getUser(id) {
    const user = await Users.findOne({ where: { userId: id } });
    return user;
  }

  async findItemByName(itemName) {
    const item = await CurrencyShop.findOne({
      where: { name: { [Op.like]: itemName } },
    });
    return item;
  }

  async getAllItems() {
    const items = await CurrencyShop.findAll();
    return items;
  }

  async getInventory(id){
    const user = await this.getUser(id);
    const items = await user.getItems(id);
    return items;
  }
}

const dataContext = new DataContext();
module.exports = dataContext;
