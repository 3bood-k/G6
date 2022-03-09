// Random emoji for a second reaction
randomEmotes = [
  "<:PeepoRose:829767554960195594>",
  "<:Gboy_Sip:832793796634476604>",
  "<:PogU:829992087537713192>",
  "<:Blushge:829776371664027648>",
  "<:Gboy_Kiss:832793535731597314>",
  "<:EZY:829776371734675486>",
  "<:PeepoFlower:832894098138202182>",
  "<:Gboy_Hyper:832793482153558016>",
  "<:PogThat:829767555019309167>",
  "<:Gboy_Shy:832793225819193344>",
  "<:WICKED:832291417690472488>",
  "<:POGGIES:829776371307642880>",
];

module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (message.channel.id == require("../Assets/json/channels.json").Boost) {
      message.react("<:Gboy_Love:832793604446486548>").then(() => {
        message.react(
          randomEmotes[Math.floor(Math.random() * randomEmotes.length)]
        );
      });
    }
  });
};
