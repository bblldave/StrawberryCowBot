const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "testerApplication") {
      const user = interaction.member.user.username;
      console.log(user);
      const name = interaction.fields.getTextInputValue("nameInput");
      const email = interaction.fields.getTextInputValue("emailInput");
      const socialHanle = interaction.fields.getTextInputValue("socialInput");
      const imageUrl = interaction.fields.getTextInputValue("imageInput");
      const confirmation = interaction.fields.getTextInputValue("confirmInput");
      //format message
      const message = `${user} submitted an application. 
      Name: ${name}
      Email: ${email}
      Social: ${socialHanle}
      Recent work: ${imageUrl}
      Confirmation: ${confirmation}`;

      //post to special channel

      await interaction.reply({
        content: message,
      });
    }
  },
};
