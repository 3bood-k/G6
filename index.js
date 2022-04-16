// Libraries
const DiscordJS = require("discord.js");
const WOKCommands = require("wokcommands");
const path = require("path");
require("dotenv/config");

const status = require("./Assets/json/status.json");
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
  new WOKCommands(client, {
    // The name of the local folder for Command files
    commandsDir: path.join(__dirname, "Commands"),
    // The name of the local folder for Feature files
    featuresDir: path.join(__dirname, "Features"),
    // The name of the local file for message text
    messagesPath: path.join(__dirname, "./Assets/json/messages.json"),

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

  // Status BOT
  setInterval(function () {
    client.user.setActivity(
      status.cases[Math.floor(Math.random() * status.cases.length)],
      {
        url: `https://twitch.tv/gboy6666`,
        type: "STREAMING",
      }
    );
  }, Math.floor(30 * 1000));
});

client.login(process.env.TOKEN);
