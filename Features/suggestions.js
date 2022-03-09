module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (
      message.channel.id == require("../Assets/json/channels.json").Suggestion
    ) {
      if (!message.member.user.bot) {
        message.delete();

        message.channel
          .send({
            embeds: [
              {
                author: {
                  name: message.author.username,
                  icon_url: message.author.avatarURL(),
                },
                title: `${({ content } = message)}`,
                color: "#2f3136",
                timestamp: new Date(),
              },
            ],
          })
          .then((message) => {
            message.react("<:Gboy_Love:832793604446486548>").then(() => {
              message.react("<:Gboy_NotLikeThis:832793656762564689>");
            });
          });
      }
    }
  });
};
