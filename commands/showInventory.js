const { SlashCommandBuilder } = require("discord.js");
const dataContext = require("../Data/dataContext");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Shows your inventory."),
  async execute(interaction) {
    const target = interaction.options.getUser("user") ?? interaction.user;
    const items = await dataContext.getInventory(target.id);
    if (!items.length) await interaction.reply(`${target.tag} has nothing!`);
    else await interaction.reply(
      `${target.tag} currently has ${items
        .map((i) => `${i.amount} ${i.item.name}`)
        .join(", ")}`
    );
  },
};
