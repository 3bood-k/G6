module.exports = {
  name: "ping",
  description: "إختبار الإنترنت لديك.",
  usage: " ",
  guildOnly: true,
  cooldown: "60",
  execute(Discord, client, message) {
    const PingEmbed = new Discord.MessageEmbed();
    message.channel.send("بونق!")
      .then(msg => msg.edit("", PingEmbed.setDescription(`**msالوقت المستغرق: \`${Date.now() - message.createdTimestamp}\`\nms\`${Math.round(client.ws.ping)}\` :API ديسكورد**`).setColor("RANDOM")))
      .catch(console.error);
  }
};
