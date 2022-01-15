const idChannel = require("../../assets/json/channel.json");
const emotes = [
  "<:GboySip_test:832793796634476604>",
  "<:PogU:829992087537713192>",
  "<:GboyKiss_test:832793535731597314>",
  "<:PeepoFlower:832894098138202182>",
  "<:GboyHyper_test:832793482153558016>",
  "<:PauseChamp:829992087226548265>",
  "<:GboyBlush_test:832793225819193344>",
];

module.exports = (client) => {
  client.on("message", (message) => {
    if (message.channel.id === idChannel.Boost) {
      message.react("<:GboyLove_test:832793604446486548>");
      message.react(emotes[Math.floor(Math.random() * emotes.length)]);
    }
  });
};
