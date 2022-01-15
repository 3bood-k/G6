const idChannel = require("../../assets/json/channel.json");

module.exports = (client) => {
  client.on("message", (message) => {
    if (message.channel.id === idChannel.TwitchClips) {
      if (
        message.content.startsWith("https://clips.twitch.tv/") ||
        message.content.startsWith("https://www.twitch.tv/")
      ) {
        // Nothing
      } else {
        message.delete();
      }
    }
  });
};
