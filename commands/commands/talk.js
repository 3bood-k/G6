module.exports = {
  commands: ["talk", "t"],
  minArgs: 2,
  callback: (message, arguments, text, client, MessageEmbed) => {
    let idChannel = message.content.split(" ").slice(1);
    const content = message.content.split(" ").slice(2);

    const channel = client.channels.cache.get(idChannel.shift());
    if (channel) {
      message.delete();
      return channel
        .send(content.join(" "))
        .catch((error) =>
          message.channel.send(
            `لا يمكنني إرسال الرساله بسبب خطأ:\n\`${error.message}\``
          )
        );
    }
  },
  permissions: "ADMINISTRATOR",
};
