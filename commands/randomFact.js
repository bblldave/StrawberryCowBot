const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fact")
    .setDescription("Tells a random fact."),
  async execute(interaction) {
    let isCleanFact = false;
    let fact = "";
    while (!isCleanFact) {
      let result = await getRandomFact();
      if (!result.ok) {
        await interaction.reply(
          `I don't know any dad facts right now. Try again in a few minutes.`
        );
        return;
      }
      const data = await result.json();
      fact = data.text;
      if (!isProfanity(`${fact}`)) {
        isCleanFact = true;
      }
    }
    await interaction.reply(`${fact}`);
  },
};

function isProfanity(str) {
  const list = require("badwords-list");
  let badwords = list.array;
  return badwords.some((word) => str.split(" ").includes(word));
}

async function getRandomFact() {
  const apiRoute = "https://uselessfacts.jsph.pl/random.json?language=en";
  const result = await fetch(apiRoute);
  return result;
}
