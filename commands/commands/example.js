module.exports = {
  commands: ["add", "addition"],
  description: "يجمع بين رقمين",
  example: `1 5`,
  cooldown: 10,
  expectedArgs: "<الرقم الثاني> <الرقم الأول>",
  permissionError: 'تحتاج إلى أن تكون "ADMINISTRATOR" لكي يمكنك استخدام الأمر',
  minArgs: 2,
  maxArgs: 2,
  callback: (message, arguments, text, client, MessageEmbed) => {
    if (message.channel.type === "dm") return;
    const num1 = +arguments[0];
    const num2 = +arguments[1];

    message.reply(`ناتج الجمع = ${num1 + num2}`);
  },
  permissions: "ADMINISTRATOR",
};
