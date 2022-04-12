module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (
      // old Commands before
      (message.content.toLowerCase().startsWith("gl ") &&
        message.mentions.users.first()) ||
      (message.content.toLowerCase().startsWith("gh ") &&
        message.mentions.users.first()) ||
      message.content.toLowerCase().startsWith("g8ball")
    ) {
      message.delete();
      message.channel.sendTyping();
      message.channel
        .send({
          files: [
            {
              attachment:
                "https://cdn.discordapp.com/attachments/798225999019245639/956935844898406420/ezgif.com-gif-maker.gif",
              name: "Tutorial_Slash_Command.gif",
            },
          ],
          embeds: [
            {
              description: `جميع أوامر ${client.user} صارت بـ \`/\`\n\nالحين رح بتكون جميع الاوامر سهلة الاستخدام للجميع <:Gboy_Hyper:832793482153558016>`,
              thumbnail: {
                url: "https://cdn.discordapp.com/attachments/798225999019245639/937184117894836244/GboyPeek.png",
              },
              color: "#f3b9c4",
            },
          ],
        })
        .then((msg) => setTimeout(() => msg.delete(), 63 * 1000));
    }
  });
};
