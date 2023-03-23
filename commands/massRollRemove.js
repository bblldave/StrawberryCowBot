const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("massroleremove")
    .setDescription("Removes the provided role from all users.")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Name of the role being taken away.")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0),
  async execute(interaction) {
    const role = interaction.options.getRole("role");
    const guild = interaction.guild;
    const members = await guild.members.fetch();
    const membersWithRole = members.filter((member) =>
      member.roles.cache.has(role.id)
    );

    for (const member of membersWithRole.values()) {
      await member.roles.remove(role);
    }

    await interaction.reply(
      `Removed ${role} from ${membersWithRole.size} members.`
    );
  },
};
