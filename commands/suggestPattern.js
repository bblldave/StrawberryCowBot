const { SlashCommandBuilder } = require("discord.js");
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggestpattern")
        .setDescription("Suggests a pattern from the database."),
    async execute(interaction) {
        const rawData = fs.readFileSync('data/patterns.json');
        const patterns = JSON.parse(rawData);
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        await interaction.reply({content:
            `How about trying the pattern ${randomPattern.patternName}? 
        Check it out here: ${randomPattern.etsyLink}`, ephemeral: true }
        );
    },
};
