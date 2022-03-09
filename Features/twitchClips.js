module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (
      message.channel.id === require("../Assets/json/channels.json").TwitchClips
    ) {
      if (
        message.content.startsWith("https://www.twitch.tv/") ||
        message.content.startsWith("https://clips.twitch.tv/")
      ) {
        // Nothing
      } else {
        message.delete();
      }
    }
  });
};
