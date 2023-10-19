const { SlashCommandBuilder } = require("discord.js");
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("removepattern")
        .setDescription("Removes a pattern from the database.")
        .addStringOption(option =>
            option.setName("patternname")
                .setDescription("Name of the pattern to remove")
                .setRequired(true)
        ).setDefaultMemberPermissions(0),
    async execute(interaction) {
        const patternName = interaction.options.getString("patternname");
        const rawData = fs.readFileSync('data/patterns.json');
        const patterns = JSON.parse(rawData);
        const updatedPatterns = patterns.filter(pattern => pattern.patternName !== patternName);
        fs.writeFileSync('data/patterns.json', JSON.stringify(updatedPatterns, null, 2));
        await interaction.reply({ content: `Pattern ${patternName} removed successfully!`, ephemeral: true });
    },
};
