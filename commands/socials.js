const { SlashCommandBuilder, hyperlink, hideLinkEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("socials")
    .setDescription("Provides links to all Hannah's Social Media Accounts"),
  async execute(interaction) {
    const tikTok = hyperlink(
      "Tiktok",
      hideLinkEmbed("https://www.tiktok.com/@hannergurumi")
    );
    const instagram = hyperlink(
      "Instagram",
      hideLinkEmbed("https://www.instagram.com/hanner_gurumi/")
    );
    const facebook = hyperlink(
      "Facebook",
      hideLinkEmbed("https://www.facebook.com/HannerGurumi")
    );
    const linkTree = hyperlink(
      "Linktree",
      hideLinkEmbed(
        "https://linktr.ee/hharris0601?fbclid=IwAR35qzbpUmCR2q1q-kSBDWgvSQBXxOk5uufd46ghYXhDvewu36MBDaK_RSQ"
      )
    );

    await interaction.reply(
      `${tikTok} \n ${instagram} \n ${facebook} \n ${linkTree}`
    );
  },
};
