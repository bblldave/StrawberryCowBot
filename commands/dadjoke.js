const axios = require("axios");
const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dadjoke")
    .setDescription("Tells a random dad joke."),
  async execute(interaction) {
    const options = {
      method: "GET",
      url: "https://dad-jokes.p.rapidapi.com/random/joke",
      headers: {
        "X-RapidAPI-Key": process.env["DadJokeApiKey"],
        "X-RapidAPI-Host": process.env["DadJokeHost"],
      },
    };

    axios
      .request(options)
      .then(async function (response) {
        const punchline = response.data.body[0].punchline;
        const setupMessage = response.data.body[0].setup;

        await interaction
          .reply(`${setupMessage} \n ${punchline}`)
          .then(async () => {
            if (isProfanity(`${setupMessage} \n ${punchline}`)) {
              await interaction.deleteReply().then(async () => {
                await interaction.channel.send(
                  "The joke contained profanity and was removed. Please try again."
                );
              });
            }
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  },
};

function isProfanity(str) {
  const list = require("badwords-list");
  let badwords = list.array;
  return badwords.some((word) => str.split(" ").includes(word));
}
