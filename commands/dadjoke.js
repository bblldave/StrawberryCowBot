const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dadjoke")
    .setDescription("Tells a random dad joke."),
  async execute(interaction) {
    let isCleanJoke = false;
    let joke = "";
    while (!isCleanJoke) {
      let result = await getDadJoke();
      if (!result.ok) {
        await interaction.reply(
          `I don't know any dad jokes right now. Try again in a few minutes.`
        );
        return;
      }
      const data = await result.json();
      joke = data.joke;
      if (!isProfanity(`${joke}`)) {
        isCleanJoke = true;
      }
    }
    await interaction.reply(`${joke}`);
  },
};

function isProfanity(str) {
  const list = require("badwords-list");
  let badwords = list.array;
  return badwords.some((word) => str.split(" ").includes(word));
}

async function getDadJoke() {
  const apiRoute = "https://icanhazdadjoke.com/";
  const result = await fetch(apiRoute, {
    headers: { Accept: "application/json" },
  });
  return result;
}
