const { Events } = require("discord.js");
var list = require("badwords-list"),
  badwords = list.array;

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    let messageWords = message.content.split(" ");
    let isProfanity = badwords.some((word) => messageWords.includes(word));
    if (isProfanity) {
      let reponseWarning = `${message.author} please try to keep profanity to a minimum. This server should remain kid friendly. Thanks.`;
      message.reply(reponseWarning);
    }
  },
};
