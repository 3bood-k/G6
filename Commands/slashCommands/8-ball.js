module.exports = {
  name: "8ball",
  description: "🎱 G6 إطرح أي سؤال لـ",
  minArgs: 1,
  expectedArgs: "<السؤال>",
  cooldown: "5s",
  slash: true,
  options: [
    {
      name: "السؤال",
      description: "G6 سؤال تأخذ فيه حكمت",
      required: true,
      type: require("discord.js").Constants.ApplicationCommandOptionTypes
        .STRING,
    },
  ],

  callback: async ({ args, interaction }) => {
    const answers = require("../../assets/json/8-ball.json");
    await interaction.deferReply();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    interaction.editReply({
      embeds: [
        {
          fields: {
            name: `\"${args.join(" ")}\"`,
            value: `🎱 ${
              answers[Math.floor(Math.random() * answers.length)]
            } 🎱`,
          },
          color: "#2f3136",
        },
      ],
    });
  },
};
