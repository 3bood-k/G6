const idChannel = require("../../assets/json/channel.json");

module.exports = (client) => {
  client.on("message", (message) => {
    if (message.channel.id === idChannel.Games) {
      if (
        message.content.startsWith("https://store.steampowered.com/") ||
        message.content.startsWith("https://www.epicgames.com/store/")
      ) {
        // Nothing
      } else {
        message.delete();
      }
    }
  });
};
