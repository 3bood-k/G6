const { MessageEmbed } = require("discord.js");
const idChannel = require("../../assets/json/channel.json");

module.exports = (client) => {
  client.on("message", (message) => {
    const { content } = message;
    const t = new MessageEmbed()
      .setTitle(message.author.tag)
      .setDescription(content)
      .setThumbnail(
        message.author.displayAvatarURL({
          dynamic: true,
          format: "png",
          size: 1024,
        })
      )
      .setTimestamp()
      .setColor("#808080")
      .setFooter(`${message.author.username} | ${message.author.id}`);

    const channelMod = client.channels.cache.get(idChannel.MessageMod);
    if (
      message.channel.type === "dm" &&
      !content.toLowerCase().startsWith(require("../../config.json").prefix) &&
      !message.author.bot
    )
      return channelMod.send(t).then(() => {
        if (channelMod)
          return message.channel
            .send("**لقد تم إرسال الرساله إلى الإداره** ✅")
            .catch((error) =>
              message.channel.send(
                `لا يمكنني إرسال الرساله بسبب خطأ:\n\`${error.message}\``
              )
            );
      });
  });
};
