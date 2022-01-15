const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
  client.on("message", (message) => {
    const { content } = message;
    const channelMod = client.channels.cache.get(
      require("../../assets/json/channel.json").MessageMod
    );

    if (
      message.channel.type === "dm" &&
      !content.toLowerCase().startsWith(require("../../config.json").prefix) &&
      !message.author.bot
    ) {
      return channelMod
        .send(
          new MessageEmbed()
            .setTitle(message.author.tag)
            .setDescription(content)
            .setThumbnail(message.author.avatarURL())
            .setTimestamp()
            .setColor("#808080")
            .setFooter(`${message.author.username} | ${message.author.id}`)
        )
        .then(() =>
          message.channel.send("**لقد تم إرسال الرساله إلى الإداره** ✅")
        );
    }
  });
};
