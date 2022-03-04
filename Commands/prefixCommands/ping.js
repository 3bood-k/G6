module.exports = {
  name: "ping",
  description: "تعرف بينق البوت",
  permissions: ["ADMINISTRATOR"],
  guildOnly: true,
  slash: false,

  callback: ({ client, message }) => {
    message.reply("Pong!").then((msg) =>
      msg.edit({
        content: " ",
        embeds: [
          {
            description: `**msالوقت المستغرق: \`${
              Date.now() - message.createdTimestamp
            }\`\nms\`${Math.round(client.ws.ping)}\` :API ديسكورد**`,
            color: "#00BFFF",
          },
        ],
      })
    );
  },
};
