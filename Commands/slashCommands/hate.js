module.exports = {
  name: "hate",
  description: "💔 كم نسبة كرهك لشخص معين",
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
    const randomNum = Math.floor(Math.random() * 100);
    const LoveSad = require("../../Assets/json/love.json");

    await interaction.deferReply();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    interaction.editReply({
      content: `نسبة كرهك لـ ${member} هي ${randomNum}% ${
        randomNum >= 30 ? "" : `<:Gboy_Love:832793604446486548>`
      }${randomNum <= 30 ? "" : `<:Gboy_NotLikeThis:832793656762564689>`}`,
      files: [
        {
          attachment: `${
            randomNum >= 30
              ? ""
              : LoveSad.gif.love[
                  Math.floor(Math.random() * LoveSad.gif.love.length)
                ]
          }${
            randomNum <= 30
              ? ""
              : LoveSad.gif.sad[
                  Math.floor(Math.random() * LoveSad.gif.sad.length)
                ]
          }`,
          name: `${randomNum >= 30 ? "" : "love.gif"}${
            randomNum <= 30 ? "" : "sad.gif"
          }`,
        },
      ],
    });
  },
};
