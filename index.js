// Libraries
const DiscordJS = require("discord.js");
const WOKCommands = require("wokcommands");
const path = require("path");
require("dotenv/config");

const status = require("./assets/json/status.json");
const { Intents } = DiscordJS;
const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on("ready", () => {
  new WOKCommands(client, {
    // The name of the local folder for Command files
    commandsDir: path.join(__dirname, "commands"),
    // The name of the local folder for Feature files
    featuresDir: path.join(__dirname, "features"),
    // The name of the local file for message text
    messagesPath: path.join(__dirname, "./assets/json/messages.json"),

    showWarns: false,
    botOwners: ["342040918150610955"],
    disabledDefaultCommands: [
      "help",
      "prefix",
      "command",
      "language",
      "channelonly",
      "requiredrole",
    ],
  }).setDefaultPrefix("?");
});

client.login(process.env.TOKEN);
