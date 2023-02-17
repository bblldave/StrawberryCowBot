const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  StringSelectMenuBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tester")
    .setDescription(
      "Allows you to submit an application to become a pattern tester."
    ),
  async execute(interaction) {
    const modal = createModal();
    await interaction.showModal(modal);
  },
};

function createModal() {
  const modal = new ModalBuilder()
    .setCustomId("testerApplication")
    .setTitle("Apply to be a tester.");
  const name = new TextInputBuilder()
    .setCustomId("nameInput")
    .setLabel("What's your full name?")
    .setStyle(TextInputStyle.Short);

  const email = new TextInputBuilder()
    .setCustomId("emailInput")
    .setLabel("What's your email?")
    .setStyle(TextInputStyle.Short);

  const socialHandle = new TextInputBuilder()
    .setCustomId("socialInput")
    .setLabel("What's your Instagram or Tiktok handle?")
    .setStyle(TextInputStyle.Short);

  const imageUrl = new TextInputBuilder()
    .setCustomId("imageInput")
    .setLabel("Link to your most recent work.")
    .setStyle(TextInputStyle.Short);

  const confirmation = new TextInputBuilder()
    .setCustomId("confirmInput")
    .setLabel("Will you be able to complete by deadline?")
    .setStyle(TextInputStyle.Short);

  const firstActionRow = new ActionRowBuilder().addComponents(name);
  const secondActionRow = new ActionRowBuilder().addComponents(email);
  const thirdActionRow = new ActionRowBuilder().addComponents(socialHandle);
  const fourthActionRow = new ActionRowBuilder().addComponents(imageUrl);
  const fifthActionRow = new ActionRowBuilder().addComponents(confirmation);

  // Add inputs to the modal
  modal.addComponents(
    firstActionRow,
    secondActionRow,
    thirdActionRow,
    fourthActionRow,
    fifthActionRow
  );

  return modal;
}
