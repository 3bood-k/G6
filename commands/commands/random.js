const axios = require("axios");

module.exports = {
  commands: ["r", "random"],
  description: "يختار قطه عشوائيه",
  example: "",
  cooldown: 3,
  expectedArgs: "[cat/cat.gif]",
  minArgs: 1,
  maxArgs: 1,
  callback: async (message, arguments, text, client, MessageEmbed) => {
    // Cat
    if (
      message.content === "g" + "r " + "cat" ||
      message.content === "G" + "r " + "cat" ||
      message.content === "g" + "random " + "cat" ||
      message.content === "G" + "random " + "cat"
    ) {
      return axios
        .get(
          "https://api.thecatapi.com/v1/images/search?size=full&mime_types=jpg"
        )
        .then((res) => {
          message.channel.send(
            new MessageEmbed()
              .setTitle("**Image Link**")
              .setURL(res.data[0].url)
              .setFooter(message.author.tag, message.author.avatarURL())
              .setImage(res.data[0].url)
          );
        })
        .catch((err) => {
          console.error("ERR:", err);
        });
    }
    // Cat Gif
    if (
      message.content === "g" + "r " + "cat.gif" ||
      message.content === "G" + "r " + "cat.gif" ||
      message.content === "g" + "random " + "cat.gif" ||
      message.content === "G" + "random " + "cat.gif"
    ) {
      return axios
        .get(
          "https://api.thecatapi.com/v1/images/search?size=full&mime_types=gif"
        )
        .then((res) => {
          message.channel.send(
            new MessageEmbed()
              .setTitle("**Gif Link**")
              .setURL(res.data[0].url)
              .setFooter(message.author.tag, message.author.avatarURL())
              .setImage(res.data[0].url)
          );
        })
        .catch((err) => {
          console.error("ERR:", err);
        });
    }
  },
};
