const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === "testerApplication") {
      const patternApplicationChannel =
        interaction.member.guild.channels.cache.get("1075982628286648382");
      const message = createMessage(interaction);

      await patternApplicationChannel
        .send(message)
        .then((message) =>
          interaction.reply({
            content: `Application submitted successfully. 
            The Tester role will be given to you if you are selected.
           `,
            ephemeral: true,
          })
        )
        .catch(console.error);
    }
  },
};

function createMessage(interaction) {
  const name = interaction.fields.getTextInputValue("nameInput");
  const email = interaction.fields.getTextInputValue("emailInput");
  const socialHanle = interaction.fields.getTextInputValue("socialInput");
  const imageUrl = interaction.fields.getTextInputValue("imageInput");
  const confirmation = interaction.fields.getTextInputValue("confirmInput");
  const user = interaction.member.user.username;

  const message = `
  ${user} submitted an application. 
  Name: ${name}
  Email: ${email}
  Social: ${socialHanle}
  Recent work: ${imageUrl}
  Confirmation: ${confirmation}`;

  return message;
}
