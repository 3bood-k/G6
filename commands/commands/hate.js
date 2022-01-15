const LoveSad = require("../../assets/json/love.json");
const Emote = require("../../assets/json/emote.json");

module.exports = {
  commands: ["hate", "h"],
  description: "معرفة كم نسبة كرهك لشخص معين",
  expectedArgs: "[@member]",
  example: "@G6",
  cooldown: 10,
  minArgs: 1,
  maxArgs: 1,
  callback: (message, arguments, text) => {
    const member = message.mentions.users.first();
    if (!member) {
      return message
        .delete()
        .then(() => message.reply("أنت لم تمنشن الشخص❕"))
        .then((msg) => msg.delete({ timeout: 2500 }));
    }

    const random = Math.floor(Math.random() * 100);
    message.channel.startTyping();
    message.reply(
      `نسبة كرهك لـ ${member} هي ${random}% ${
        random >= 30 ? "" : `${Emote.GBOY6666.love}`
      }${random <= 30 ? "" : `${Emote.GBOY6666.notLikeThis}`}`,
      {
        files: [
          {
            attachment: `${
              random <= 30
                ? ""
                : LoveSad.gif.sad[
                    Math.floor(Math.random() * LoveSad.gif.sad.length)
                  ]
            }${
              random >= 30
                ? ""
                : LoveSad.gif.love[
                    Math.floor(Math.random() * LoveSad.gif.love.length)
                  ]
            }`,
            name: `${random <= 30 ? "" : "sad.gif"}${
              random >= 30 ? "" : "love.gif"
            }`,
          },
        ],
      }
    );

    message.channel.stopTyping(true);
  },
};
