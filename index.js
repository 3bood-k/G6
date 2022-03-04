// Librarie
const Discord = require("discord.js");
// New "client" with Default Discord Librarie
const client = new Discord.Client();

// Files //hi
require("dotenv").config();
const status = require("./assets/json/status.json");

// Start Client (Start Bot)
client.on("ready", async () => {
  console.log("[--------------------- R E A D Y ---------------------]");

  // Status BOT
  setInterval(function () {
    client.user
      .setActivity(
        status.cases[Math.floor(Math.random() * status.cases.length)],
        {
          url: `https://twitch.tv/${status.twitchChannel}`,
          type: "STREAMING",
        }
      )
      .catch(console.error);
  }, Math.floor(30 * 1000));
});

// Token
client.login(process.env.TOKEN);
