// Libraries
const DiscordJS = require("discord.js");
const WOKCommands = require("wokcommands");
const path = require("path");
require("dotenv/config");

const status = require("./assets/json/status.json");
const { Intents } = DiscordJS;
const client = new DiscordJS.Client({
  partials: ["CHANNEL"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

client.on("ready", async () => {
  // Status BOT
  setInterval(function () {
    client.user.setActivity(
      status.cases[Math.floor(Math.random() * status.cases.length)],
      {
        url: `https://twitch.tv/${status.twitchChannel}`,
        type: "STREAMING",
      }
    );
  }, Math.floor(30 * 1000));

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
