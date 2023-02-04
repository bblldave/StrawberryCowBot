const { Events } = require("discord.js");

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const welcomeChannel = member.guild.channels.cache.get(
      "1070132231705731084"
    );
    const welcomeMessage = `Welcome! <@${member.id}> Grab a hook and hang out! MOO!`;

    welcomeChannel
      .send(welcomeMessage)
      .then((message) => console.log(`Sent message: ${message.content}`))
      .catch(console.error);
  },
};
