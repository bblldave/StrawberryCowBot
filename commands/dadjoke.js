const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');
const { DadJokeApiKey, DadJokeHost } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dadjoke')
		.setDescription('Tells a random dad joke.'),
	async execute(interaction) {
    const options = {
      method: 'GET',
      url: 'https://dad-jokes.p.rapidapi.com/random/joke',
      headers: {
        'X-RapidAPI-Key': DadJokeApiKey,
        'X-RapidAPI-Host': DadJokeHost,
      },
    };

    axios.request(options).then(async function(response) {
      const punchline = response.data.body[0].punchline;
      const setupMessage = response.data.body[0].setup;

      await interaction.reply(`${setupMessage} \n ${punchline}`);
    }).catch(function(error) {
      console.error(error);
    });
	},
};
