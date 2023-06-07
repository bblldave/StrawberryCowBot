const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get help with a specific crochet technique or stitch.')
		.addStringOption(option =>
			option.setName('technique')
				.setDescription('The crochet technique you need help with.')
				.setRequired(true),
		),
	async execute(interaction) {
		// Replace 'CHANNEL_ID' with the ID of the channel where you want to allow the command
		if (interaction.channelId !== process.env.helpChannel) {
			await interaction.reply({ content: "This command can only be used in the crochet help channel.", ephemeral: true });
			return;
		}

		// Defer reply
		await interaction.deferReply();
		const technique = interaction.options.getString('technique');
		const gptResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: `I need help with the crochet technique: ${technique}`}]
		});
		// Edit the reply
		await interaction.editReply(gptResponse.data.choices[0].message);
	},
};
