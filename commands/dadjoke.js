const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dadjoke")
    .setDescription("Tells a random dad joke."),
  async execute(interaction) {
    const result = await getDadJoke();
    if (!result.ok) {
      await interaction.reply(
        `I don't know any dad jokes right now. Try again in a few minutes.`
      );
      return;
    }
    const data = await result.json();
    const joke = data.joke;
    await interaction.reply(`${joke}`).then(async () => {
      if (isProfanity(`${joke}`)) {
        await interaction.deleteReply().then(async () => {
          await interaction.channel.send(
            "The joke contained profanity and was removed. Please try again."
          );
        });
      }
    });
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
