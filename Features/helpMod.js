module.exports = (client) => {
  client.on("messageCreate", (message) => {
    const channelMod = client.channels.cache.get(
      require("../Assets/json/channel.json").MessageMod
    );

    if (message.channel.type == "DM" && !message.author.bot) {
      channelMod
        .send({
          embeds: [
            {
              title: message.author.username,
              description: `${({ content } = message)}`,
              color: "#808080",
              thumbnail: {
                url: message.author.avatarURL(),
              },
              timestamp: new Date(),
              footer: {
                text: `${message.author.tag} | ${message.author.id}`,
              },
            },
          ],
        })
        .then(() =>
          message.channel.send("**لقد تم إرسال الرساله إلى الإداره** ✅")
        );
    }
  });
};
