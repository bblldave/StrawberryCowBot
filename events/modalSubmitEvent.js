const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === "pollModal") {
      const pollBody = interaction.fields.getTextInputValue("bodyInput");
      //save poll to database
      //create embed of poll
      const pollEmbed = new EmbedBuilder()
      .setTitle("Vote for crochet-along.")
      .setDescription(pollBody)
      .setColor("Fuchsia");

      await interaction.reply({ embeds: [pollEmbed] });
    }
  },
};
