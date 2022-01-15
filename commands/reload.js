module.exports = {
  name: "reload",
  description: "إعادة تحميل الأمر.",
  aliases: "r",
  usage: "[الأمر]",
  example: "help",
  cooldown: "0",
  execute(Discord, client, message, args, config) {
    if (!config.Devs.includes(message.author.id)) return;

    const Name = message.content.split(" ").slice(1);
    if (!Name.length) return message.channel.send("الرجاء منك كتابة الأمر❕").then(msg => msg.delete({ timeout: 1300 }));

    const commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return message.channel.send(`${message.author}, لا يوجد أمر بهذا الإسم \`${commandName}\`!`);
    delete require.cache[require.resolve(`./${command.name}.js`)];

    try {
      const newCommand = require(`./${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);

      if (message.channel.type === "dm") return message.channel.send(`تم إعادة تحميل أمر \`${command.name}\` ♻️`);
      message.channel.send(`تم إعادة تحميل أمر \`${command.name}\` ♻️`).then(msg => msg.delete({ timeout: 3000 }));
    } catch (error) {
      message.channel.send(`هناك مشكله في أمر: \`${command.name}\`\n\`${error.message}\``);
    }
  }
};
