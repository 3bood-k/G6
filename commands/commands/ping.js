module.exports = {
  commands: "ping",
  description: "إختبار سرعه البوت",
  minArgs: 0,
  maxArgs: 0,
  cooldown: 60,
  callback: (message, arguments, text, client, MessageEmbed) => {
    message.channel
      .send("Pong!")
      .then((msg) =>
        msg.edit(
          "",
          new MessageEmbed()
            .setColor("#00BFFF")
            .setDescription(
              `**msالوقت المستغرق: \`${
                Date.now() - message.createdTimestamp
              }\`\nms\`${Math.round(client.ws.ping)}\` :API ديسكورد**`
            )
        )
      );
  },
};
