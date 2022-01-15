module.exports = {
  name: "example",
  description: "هذا أمر تجريبي",
  aliases: ["test", "testing", "تجربه", "تجربة"],
  usage: ["1", "2"],
  example: ["1", "2"],
  guildOnly: true,
  cooldown: "10",
  execute(Discord, client, message) {
    message.channel.send("Hi there", { tts: true });
  }
};