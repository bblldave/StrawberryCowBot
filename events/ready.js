const { Events } = require("discord.js");
const { Sequelize } = require("sequelize");
const  config  = require("../data/config/config.js");
const environment = process.env.NODE_ENV;

switch (environment) {
  case "development":
    envDialect = config.development.dialect;
    envStorage = config.development.storage;
    break;
  case "production":
    envDialect = config.production.dialect;
    envStorage = config.production.storage;
    break;
  case "test":
    envDialect = config.test.dialect;
    envStorage = config.test.storage;
    break;
  default:
    break;
}
const sequelize = new Sequelize({
  dialect: envDialect,
  storage: envStorage
});

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    sequelize.sync();
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
