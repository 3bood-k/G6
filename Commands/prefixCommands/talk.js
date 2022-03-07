module.exports = {
  name: "talk",
  aliases: ["t"],
  description: "تتكلم بحساب البوت",
  permissions: ["ADMINISTRATOR"],
  slash: false,
  guildOnly: true,
  minArgs: 2,
  expectedArgs: "<الرساله> <أيدي الروم#>",

  callback: ({ client, message, text }) => {
    let idChannel = message.content.split(" ").slice(1);
    const content = message.content.split(" ").slice(2);

    let channel = client.channels.cache.get(idChannel.shift());
    if (channel) {
      message.delete();
      channel
        .send(content.join(" "))
        .catch((error) =>
          message.channel.send(
            `لا يمكنني إرسال الرساله بسبب خطأ:\n\`${error.message}\``
          )
        );
    }
  },
};
