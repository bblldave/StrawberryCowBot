const { Client, GatewayIntentBits, Partials } = require("discord.js");
require("dotenv").config();
const { loadCommands, loadEvents } = require("./loader");

const createClient = () => {
  return new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
    ],
    partials: [Partials.GuildMember],
  });
};

const initClient = () => {
  const client = createClient();

  loadCommands(client);
  loadEvents(client);

  client.login(process.env.token);
};

module.exports = {
  initClient,
};
