const { MessageEmbed } = require("discord.js");
const idChannel = require("../../assets/json/channel.json");
const config = require("../../config.json");

module.exports = (client) => {
  client.on("message", (message) => {
    const { channel, content, member } = message;

    if (message.channel.id === idChannel.Suggestion) {
      // Bad words
      if (
        message.content.startsWith("كس") ||
        message.content.startsWith("كل") ||
        message.content.startsWith("زق") ||
        message.content.startsWith("كلب") ||
        message.content.startsWith("الحس") ||
        message.content.startsWith("حمار") ||
        message.content.startsWith("ملعون") ||
        message.content.startsWith("يا زق") ||
        message.content.startsWith("حيوان") ||
        message.content.startsWith("يا كلب") ||
        message.content.startsWith("يا حمار") ||
        message.content.startsWith("يا ملعون") ||
        message.content.startsWith("يا حيوان") ||
        message.content.startsWith("الله يلعنك") ||
        message.content.startsWith("fuck") ||
        message.content.startsWith("bitch") ||
        message.content.startsWith("pussy") ||
        message.content.startsWith("dick")
      )
        return message.delete();

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
        message.content.startsWith("!")
      )
        return message.delete();

      if (
        idChannel.Suggestion &&
        idChannel.Suggestion === channel.id &&
        !member.user.bot
      ) {
        message.delete();

        const suggestionEmbed = new MessageEmbed()
          .setAuthor(member.user.tag, member.user.displayAvatarURL())
          .setTitle(content)
          .setTimestamp()
          .setColor("#2f3136");
        channel.send(suggestionEmbed).then((message) => {
          message.react("<:GboyLove_test:832793604446486548>").then(() => {
            message.react("<:GboyNotlikethis_test:832793656762564689>");
          });
        });
      }
    }
  });
};
