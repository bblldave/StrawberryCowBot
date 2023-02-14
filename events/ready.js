const { Events } = require("discord.js");
const dataContext = require("../Data/dataContext");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    dataContext.setCurrency();
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
