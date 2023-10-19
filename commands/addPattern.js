const { SlashCommandBuilder } = require("discord.js");
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addpattern")
        .setDescription("Adds a new pattern to the database.")
        .addStringOption(option =>
            option.setName("patternname")
                .setDescription("Name of the pattern")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("etsylink")
                .setDescription("Etsy link of the pattern")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(0),
    async execute(interaction) {
        const patternName = interaction.options.getString("patternname");
        const etsyLink = interaction.options.getString("etsylink");

        // Read existing patterns
        const rawData = fs.readFileSync("data/patterns.json");
        const patterns = JSON.parse(rawData);

        // Add new pattern
        patterns.push({ patternName, etsyLink});

        // Save back to file
        fs.writeFileSync('data/patterns.json', JSON.stringify(patterns, null, 2));

        await interaction.reply({content: `Pattern ${patternName} added successfully!`,ephemeral: true });
    },
};
