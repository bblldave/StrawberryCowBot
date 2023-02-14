const { SlashCommandBuilder, codeBlock } = require("discord.js");
const dataContext = require("../Data/dataContext");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Displays the shop."),
  async execute(interaction) {
    const items = await dataContext.getAllItems();
    await interaction.reply(
      codeBlock(items.map((i) => `${i.name}: ${i.price}💰`).join("\n"))
    );
  },
};
