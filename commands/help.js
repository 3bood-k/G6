module.exports = {
  name: "help",
  description: "إرسال الأوامر لك أو مساعدتك على أوامر.",
  aliases: ["مساعدة", "مساعده"],
  usage: "[الأمر]",
  cooldown: "0",
  execute(Discord, client, message, args, config) {
    if (!args[0]) return;

    const { commands } = message.client;
    const name = args[0].toLowerCase();
    const Command = commands.get(name) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));
    if (!Command) return message.channel.send("هذا الأمر غير موجود 🙄");

    const HelpCommandEmbed = new Discord.MessageEmbed();
    if (Command.name) HelpCommandEmbed.setTitle(`**الأمر**: ${Command.name}`);
    if (Command.description) HelpCommandEmbed.setDescription(`${Command.description}`);

    if (!Command.aliases || !Command.aliases.join) {
      if (Command.aliases) HelpCommandEmbed.addField("**الإختصار:**", `${config.Prefix}${Command.aliases}`);
    } else {
      if (Command.aliases.join) HelpCommandEmbed.addField("**الإختصارات:**", `${config.Prefix}${Command.aliases.join(`, ${config.Prefix}`)}`);
    }

    if (!Command.usage || !Command.usage.join) {
      if (Command.usage) HelpCommandEmbed.addField("**الإستخدام:**", `${config.Prefix}${Command.name} ${Command.usage}`);
    } else {
      if (Command.usage.join) HelpCommandEmbed.addField("**الإستخدامات:**", `${config.Prefix}${Command.name} ${Command.usage.join(`\n${config.Prefix}${Command.name} `)}`);
    }

    if (!Command.example || !Command.example.join) {
      if (Command.example) HelpCommandEmbed.addField("**مثال:**", `${config.Prefix}${Command.name} ${Command.example}`);
    } else {
      if (Command.example.join) HelpCommandEmbed.addField("**الأمثله:**", `${config.Prefix}${Command.name} ${Command.example.join(`\n${config.Prefix}${Command.name} `)}`);
    }
    message.channel.send(HelpCommandEmbed);
  }
};
