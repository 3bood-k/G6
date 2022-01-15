const idChannel = require("../../assets/json/channel.json");
const Emote = require("../../assets/json/emote.json");
const emotes = [
  "<:PeepoRose:829767554960195594>",
  Emote.GBOY6666.sip,
  "<:PogU:829992087537713192>",
  "<:Blushge:829776371664027648>",
  Emote.GBOY6666.kiss,
  "<:PeepoFlower:832894098138202182>",
  Emote.GBOY6666.hyper,
  "<:PauseChamp:829992087226548265>",
  "<:peepoComfyBlush:829776371471089705>",
  Emote.GBOY6666.shy,
  "<:WICKED:832291417690472488>",
];

module.exports = (client) => {
  client.on("message", (message) => {
    if (message.channel.id === idChannel.Boost) {
      message.react(Emote.GBOY6666.love).then(() => {
        message.react(emotes[Math.floor(Math.random() * emotes.length)]);
      });
    }
  });
};
