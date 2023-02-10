const { Events } = require("discord.js");

module.exports = {
  name: Events.GuildMemberUpdate,
  async execute(oldMember, newMember) {
    const crochetWithMeChannel = newMember.client.channels.cache.get(
      "1070132232263585875"
    );
    if (newMember.roles.cache.some((role) => role.name === "Event Verified")) {
      await crochetWithMeChannel
        .createInvite()
        .then((invite) =>
          newMember.send(
            `Here is your invite to the Crochet With Me channel: ${invite}`
          )
        );
    }
  },
};
