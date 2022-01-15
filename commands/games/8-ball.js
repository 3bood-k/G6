const Commando = require("discord.js-commando");
const ball = require("../../assets/json/8-ball.json");

module.exports = class Ball_8 extends (
    Commando.Command
) {
    constructor(client) {
        super(client, {
            name: "8-ball",
            description: "8ball إطرح سؤالك لـ",
            group: "games",
            memberName: "8-ball",
            aliases: ["8ball"],
            usage: "[السؤال]",
        });
    }

    async run(message) {
        const question = message.content.split(" ").slice(1);

        if (parseInt(question[0]) > -10000000000) {
            return message.reply(
                ball.replay[Math.floor(Math.random() * ball.replay.length)]
            );
        }

        if (!question[0]) {
            return message
                .delete()
                .then((help) => message.reply("الرجاء وضع السؤال"))
                .then((msg) => msg.delete({ timeout: 1500 }));
        }

        message.channel.send(`
            ${question.join(" ")}\n🎱 ${
            ball.answers[Math.floor(Math.random() * ball.answers.length)]
        } 🎱
        `);
    }
};
