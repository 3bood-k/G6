// Librarie
const Discord = require("discord.js");
// New client with Default Discord
const client = new Discord.Client();

// Files
const activity = require("./assets/json/status");
const loadCommands = require("./commands/load-commands");
const loadFeatures = require("./features/load-features");
// Shortcut Command
loadCommands(client);
loadFeatures(client);

// Start Client (Start Bot)
client.on("ready", async () => {
  console.log(
    `-----------------------------\n           Ready!\n${client.user.tag} | ${client.user.id}\n-----------------------------`
  );

  // State
  /*
  setInterval(function () {
    client.user
      .setActivity(
        activity.status[Math.floor(Math.random() * activity.status.length)],
        { url: "https://twitch.tv/gboy6666", type: "STREAMING" }
      )
      .catch(console.error);
  }, Math.floor(30 * 1000));
  */

  // State STOP
  client.user
    .setPresence({
      activity: { name: "صار عندي نظام جديد وسريع أحسن من أول" },
      status: "online",
    })
    .catch(console.error);
});

// Token
client.login(process.env.TOKEN);
