const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giveaway")
    .setDescription("Selects a random user to win a give away.")
    .addStringOption((option) =>
      option
        .setName("item")
        .setDescription("Name of item being given away")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    const giveAwayItem = interaction.options.getString("item");
    const guild = interaction.guild;
    const members = await guild.members.fetch();
    let randomMember = members.random();
    while (randomMember.user.bot) {
      randomMember = members.random();
    }

    await interaction.reply(`${randomMember} you have won the ${giveAwayItem}`);
  },
};
