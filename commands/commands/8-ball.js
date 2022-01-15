const ball = require("../../assets/json/8-ball.json");

module.exports = {
  commands: ["8-ball", "8ball"],
  description: "8ball إطرح سؤالك لـ",
  expectedArgs: ["[السؤال]"],
  example: ["هل الكوكب دائري"],
  cooldown: 30,
  minArgs: 1,
  callback: (message, arguments, client, MessageEmbed) => {
    if (message.channel.type === "dm") return;
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
  },
};
