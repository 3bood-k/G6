module.exports = (client) => {
  client.on("message", (message) => {
    if (
      message.channel.id === require("../../assets/json/channel.json").Games
    ) {
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
