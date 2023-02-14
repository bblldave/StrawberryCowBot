const { SlashCommandBuilder } = require("discord.js");
const dataContext = require("../Data/dataContext");
const { CurrencyShop, Users } = require("../Data/dbObjects");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Allows you to buy an item from the shop.")
    .addStringOption( option => 
      option.setName("item")
            .setDescription("The name of the item you wish to buy.")
            .setRequired(true)),
  async execute(interaction) {
    const itemName = interaction.options.getString("item");
    const item = await dataContext.findItemByName(itemName);

    if (!item) await interaction.reply("That item doesn't exist.");
    if (item.price > dataContext.getBalance(interaction.user.id)) {
      await interaction.reply(
        `You currently have ${getBalance(interaction.user.id)}, but the ${
          item.name
        } costs ${item.price}!`
      );
    }

    const user = await dataContext.getUser(interaction.user.id);
    dataContext.addBalance(interaction.user.id, -item.price);
    await user.addItem(interaction.user.id,item);
    await interaction.reply(`You have bought: ${item.name}`);
  },
};
