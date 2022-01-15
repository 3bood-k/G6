module.exports = {
  commands: "ping",
  description: "إختبار سرعه البوت",
  minArgs: 0,
  maxArgs: 0,
  cooldown: 60,
  callback: (message, arguments, text, client, MessageEmbed) => {
    if (message.channel.type === "dm") return;
    const PingEmbed = new MessageEmbed();
    message.channel
      .send("بونق!")
      .then((msg) =>
        msg.edit(
          "",
          PingEmbed.setDescription(
            `**msالوقت المستغرق: \`${
              Date.now() - message.createdTimestamp
            }\`\nms\`${Math.round(client.ws.ping)}\` :API ديسكورد**`
          ).setColor("#00BFFF")
        )
      )
      .catch(console.error);
  },
};
