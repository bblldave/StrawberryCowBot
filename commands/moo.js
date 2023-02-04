const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moo')
		.setDescription('Moos at you!'),
	async execute(interaction) {
		await interaction.reply('MOO!');
	},
};