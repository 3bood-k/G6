const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Definition of my files
const config = require("./config.json");
const statuss = require("./assets/json/activity.json");

const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Start Bot
client.once("ready", () => {
    console.log(`${client.user.tag} is READY!`);

    setInterval(function () {
        client.user.setActivity(statuss[Math.floor(Math.random() * statuss.length)], { url: "https://twitch.tv/gboy6666", type: "STREAMING" })
    }, Math.floor(30 * 1000))
});

//=========================================================={Single Commands}================================================================================================\\

// Twitch Clips
client.on("message", (message) => {
    if (message.channel.id === "735945195199397929") {
        if (message.content.startsWith("https://clips.twitch.tv/") || message.content.startsWith("https://www.twitch.tv/")) {
            // Nothing
        } else {
            message.delete();
        }
    }
});

// Games
client.on("message", (message) => {
    if (message.channel.id === "ID_CHANNEL") {
        if (message.content.startsWith("https://store.steampowered.com/") || message.content.startsWith("https://www.epicgames.com/store/")) {
            // Nothing
        } else {
            message.delete();
        }
    }
});

//=============================================================={System}=====================================================================================================\\
client.on("message", (message) => {
    if (!message.content.startsWith(config.Prefix) || message.author.bot) return;

    const args = message.content.slice(config.Prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (command.guildOnly && message.channel.type === "dm") {
        return message.channel.send("لا أستطيع تنفيذ هذا الأمر في الخاص!");
    }

    if (command.args && !args.length) {
        let reply = `لم تقدم أي حجج, ${message.author}!`;

        if (command.usage) {
            reply += `\n:سيكون الاستخدام السليم \`${config.Prefix}${command.name} ${command.usage}\``;
        } return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            if (timeLeft.toFixed() < 1) return message.delete().then(Wait => message.reply("الرجاء منك إنتظار (**ثانيه**).")).then(msg => msg.delete({ timeout: 2000 }));
            if (timeLeft.toFixed() < 2) return message.delete().then(Wait => message.reply("الرجاء منك إنتظار (**ثانيتان**).")).then(msg => msg.delete({ timeout: 2000 }));
            if (timeLeft.toFixed() < 10) return message.delete().then(Wait => message.reply(`الرجاء منك إنتظار (**${timeLeft.toFixed()}** ثواني).`)).then(msg => msg.delete({ timeout: 2000 }));
            if (timeLeft.toFixed() <= 59) return message.delete().then(Wait => message.reply(`الرجاء منك إنتظار (**${timeLeft.toFixed()}** ثانيه).`)).then(msg => msg.delete({ timeout: 2000 }));
            if (timeLeft.toFixed() < 60) return message.delete().then(Wait => message.reply("الرجاء منك إنتظار (**دقيقه**).")).then(msg => msg.delete({ timeout: 2000 }));
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(Discord, client, message, args, config);
    } catch (error) {
        console.error(`\n======================================================================================================================================================================================\n» The Error File: ${command.name} «\n${error}\n======================================================================================================================================================================================`);
        message.reply("هناك خطأ في الأمر!");
    }
});

client.login(process.env.TOKEN);
