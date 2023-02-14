const { SlashCommandBuilder } = require("discord.js");
const dataContext = require("../Data/dataContext");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Shows your current balance."),
  async execute(interaction) {
    const target = interaction.options.getUser("user") ?? interaction.user;
    await interaction.reply(
      `${target.tag} has ${dataContext.getBalance(target.id)}💰`
    );
  },
};
