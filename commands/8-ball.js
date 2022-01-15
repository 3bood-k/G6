const ball = require("../assets/json/8-ball.json");

module.exports = {
    name: "8-ball",
    description: "8ball إطرح سؤالك لـ",
    aliases: "8ball",
    usage: "[السؤال]",
    guildOnly: true,
    cooldown: "10",
    execute(Discord, client, message) {
        const question = message.content.split(" ").slice(1);
        if (parseInt(question[0]) > -10000000000) return message.reply(ball.replay[Math.floor(Math.random() * ball.replay.length)]);
        if (!question[0]) return message.delete().then(Help => message.reply("الرجاء وضع السؤال")).then(msg => msg.delete({ timeout: 2500 }));

        message.channel.send(`${question.join(" ")}\n🎱 ${ball.answers[Math.floor(Math.random() * ball.answers.length)]} 🎱`);
    }
};