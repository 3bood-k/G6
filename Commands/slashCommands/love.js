module.exports = {
  name: "love",
  description: "💖 كم نسبة حبك لشخص معين",
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<منشن الشخص>",
  cooldown: "5s",
  guildOnly: true,
  slash: true,
  options: [
    {
      name: "الشخص",
      description: "الشخص الي تبي تعرف عنه",
      required: true,
      type: "USER",
    },
  ],

  callback: async ({ guild, args, interaction }) => {
    const member = await guild.members.fetch(args.shift());
    const random = Math.floor(Math.random() * 100);
    const LoveSad = require("../../assets/json/love.json");

    await interaction.deferReply();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    interaction.editReply({
      content: `نسبة حبك لـ ${member} هي ${random}% ${
        random <= 30 ? "" : `<:Gboy_Love:832793604446486548>`
      }${random >= 30 ? "" : `<:Gboy_NotLikeThis:832793656762564689>`}`,
      files: [
        {
          attachment: `${
            random <= 30
              ? ""
              : LoveSad.gif.love[
                  Math.floor(Math.random() * LoveSad.gif.love.length)
                ]
          }${
            random >= 30
              ? ""
              : LoveSad.gif.sad[
                  Math.floor(Math.random() * LoveSad.gif.sad.length)
                ]
          }`,
          name: `${random <= 30 ? "" : "love.gif"}${
            random >= 30 ? "" : "sad.gif"
          }`,
        },
      ],
    });
  },
};
