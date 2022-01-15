const { MessageEmbed } = require("discord.js");

const idChannel = require("../../assets/json/channel.json");
const Emote = require("../../assets/json/emote.json");
const config = require("../../config.json");

module.exports = (client) => {
  client.on("message", (message) => {
    const { content } = message;

    if (
      message.channel.id === idChannel.Suggestion ||
      message.channel.id === idChannel.Suggestion100Hour
    ) {
      if (message.content.startsWith("##")) {
        if (
          message.member.id === config.owner ||
          message.member.id === config.devs ||
          message.member.roles.cache.get(config.roleMod)
        ) {
          return;
        } else {
          return message.delete();
        }
      } else if (
        message.content.startsWith("#") ||
        message.content.startsWith("<") ||
        message.content.startsWith("!") ||
        message.content.startsWith("@everyone") ||
        message.content.startsWith("https://discocrd")
      ) {
        return message.delete();
      }

      if (
        (message.channel.id === idChannel.Suggestion &&
          !message.member.user.bot) ||
        (message.channel.id === idChannel.Suggestion100Hour &&
          !message.member.user.bot)
      ) {
        message.delete();

        if (
          message.content === "بوت" ||
          message.content === "بوت الاقتراح" ||
          message.content === "بوت الإقتراح" ||
          message.content === "بوت [الإقتراح]" ||
          message.content === "بوت [الاقتراح]"
        ) {
          if (message.channel.id === idChannel.Suggestion100Hour) return;
          if (message.channel.id === idChannel.Suggestion)
            return message.channel
              .send(
                new MessageEmbed()
                  .setTitle("إقتراح للبوت")
                  .addFields(
                    { name: "**الإستخدام:**", value: "بوت [الإقتراح]" },
                    { name: "**مثال:**", value: "Ping بوت إضافه امر" }
                  )
              )
              .then((msg) => msg.delete({ timeout: 8000 }));
        }
        let suggestionEmbed = new MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setTitle(content)
          .setColor("#2f3136")
          .setTimestamp();

        if (message.content.startsWith("بوت ")) {
          if (message.channel.id === idChannel.Suggestion)
            return message.channel
              .send(
                suggestionEmbed
                  .setTitle(content.split(" ").slice(1).join(" "))
                  .setDescription(`إقتراح لبوت ${client.user}`)
                  .setColor("#7B68EE")
              )
              .then((message) => {
                message.react(Emote.GBOY6666.love).then(() => {
                  message.react(Emote.GBOY6666.notLikeThis);
                });
              });
        }

        message.channel.send(suggestionEmbed).then((message) => {
          message.react(Emote.GBOY6666.love).then(() => {
            message.react(Emote.GBOY6666.notLikeThis);
          });
        });
      }
    }
  });
};
