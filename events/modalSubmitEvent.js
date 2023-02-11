const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === "pollModal") {
      const pollBody = interaction.fields.getTextInputValue("bodyInput");
      const link1 = interaction.fields.getTextInputValue("link1");
      const link2 = interaction.fields.getTextInputValue("link2");
      const link3 = interaction.fields.getTextInputValue("link3");
      const emojis = interaction.fields.getTextInputValue("emojis");

      let message = `@everyone ${pollBody}  
      ${link1} 

      ${link2}
       
      ${link3} `;
      //save poll to database
      //create embed of poll
      const pollEmbed = new EmbedBuilder()
        .setTitle("Vote for crochet-along.")
        .setDescription(pollBody)
        .addFields(
          { name: "Pattern 1: ", value: link1 },
          { name: "Pattern 2: ", value: link2 },
          { name: "Pattern 3: ", value: link3 }
        )
        .setColor("Fuchsia");

      await interaction.reply(message);
    }
  },
};
