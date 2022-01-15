const gif = require("../../assets/json/love.json");

module.exports = {
  commands: ["love", "l"],
  description: "معرفة كم نسبة حبك لشخص معين",
  expectedArgs: "[@member]",
  example: `@G6`,
  cooldown: 60,
  minArgs: 1,
  maxArgs: 1,
  callback: (message, arguments, text) => {
    if (message.channel.type === "dm") return;

    const member = message.mentions.users.first();
    if (!member)
      return message
        .delete()
        .then(() => message.reply("!أنت لم تمنشن الشخص"))
        .then((msg) => msg.delete({ timeout: 2500 }));

    const random = Math.floor(Math.random() * 100);
    message.channel.startTyping();
    message.channel.stopTyping(true);
    message.reply(
      `نسبة حبك لـ ${member} هي ${random}% ${
        random >= 30 ? "" : "<:GboyNotlikethis_test:832793656762564689>"
      }${random <= 30 ? "" : "<:GboyLove_test:832793604446486548>"}`,
      {
        files: [
          `${
            random <= 30
              ? ""
              : gif.image.love[
                  Math.floor(Math.random() * gif.image.love.length)
                ]
          }${
            random >= 30
              ? ""
              : gif.image.sad[Math.floor(Math.random() * gif.image.love.length)]
          }`,
        ],
      }
    );
  },
};
