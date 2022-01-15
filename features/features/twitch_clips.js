module.exports = (client) => {
  client.on("message", (message) => {
    if (
      message.channel.id ===
      require("../../assets/json/channel.json").TwitchClips
    ) {
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
