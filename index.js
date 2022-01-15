// Libraries
const path = require("path");
const Commando = require("discord.js-commando");

// My files
const config = require("./config.json");
const activity = require("./assets/json/status.json");
const loadFeatures = require("./features/load-features");

// New client with Commando
const client = new Commando.CommandoClient({
    owner: [config.owner, config.devs],
    commandPrefix: config.prefix,
});

// Commmand files
client.registry
    .registerGroups([
        ["games", "fun games"],
        ["help", "help member"],
        ["moderation", "owners commands"],
        ["member", "members can be use a commands"],
    ])
    .registerCommandsIn(path.join(__dirname, "commands"));
loadFeatures(client);

// Start Bot
client.on("ready", async () => {
    console.log(client.user.tag, activity.startClient);

    // State
    setInterval(function () {
        client.user.setActivity(
            activity.status[Math.floor(Math.random() * activity.status.length)],
            { url: "https://twitch.tv/gboy6666", type: "STREAMING" }
        );
    }, Math.floor(30 * 1000));
});

// Token
client.login(process.env.TOKEN);
