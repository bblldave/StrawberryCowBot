const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Creates a poll in the desired channel."),
  async execute(interaction) {
    const modal = CreatePollModal();

    await interaction.showModal(modal);
  },
};

function CreatePollModal() {
  const modal = new ModalBuilder()
    .setCustomId("pollModal")
    .setTitle("Create A Poll");

  const main = new TextInputBuilder()
    .setCustomId("bodyInput")
    .setLabel("Main text for poll")
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder("Explain what you would like people to vote on!");

  const link1 = new TextInputBuilder()
    .setCustomId("link1")
    .setLabel("First pattern link")
    .setStyle(TextInputStyle.Short)
    .setPlaceholder("Url to a pattern");

  const link2 = new TextInputBuilder()
    .setCustomId("link2")
    .setLabel("Second pattern link")
    .setStyle(TextInputStyle.Short)
    .setPlaceholder("Url to a pattern");

  const link3 = new TextInputBuilder()
    .setCustomId("link3")
    .setLabel("Third pattern link")
    .setStyle(TextInputStyle.Short)
    .setPlaceholder("Url to a pattern");

  const emojis = new TextInputBuilder()
    .setCustomId("emojis")
    .setLabel("Emojis separated by commas")
    .setStyle(TextInputStyle.Short)
    .setPlaceholder("Emojis used for voting");

  const firstActionRow = new ActionRowBuilder().addComponents(main);
  const secondActionRow = new ActionRowBuilder().addComponents(link1);
  const thirdActionRow = new ActionRowBuilder().addComponents(link2);
  const fourthActionRow = new ActionRowBuilder().addComponents(link3);
  const fifthActionRow = new ActionRowBuilder().addComponents(emojis);
  modal.addComponents(firstActionRow);
  modal.addComponents(secondActionRow);
  modal.addComponents(thirdActionRow);
  modal.addComponents(fourthActionRow);
  modal.addComponents(fifthActionRow);

  return modal;
}
