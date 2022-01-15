const { Devs } = require("../config.json");

module.exports = {
  name: "suggestion",
  description: "اقتراح اشياء لتطوير البوت",
  aliases: ["اقتراح", "اقترح", "sug"],
  usage: "[الإقتراح]",
  guildOnly: true,
  cooldown: "10",
  execute(Discord, client, message) {
    if (message.deletable) message.delete();

    const suggestion = message.content.split(" ").slice(1);
    if (!suggestion[0]) return message.reply("الراجاء وضع الإقتراح").then(msg => msg.delete({ timeout: 2000 }));
    if (parseInt(suggestion[0]) > -10000000000) return;

    const owner = client.users.cache.get(Devs);
    const SuggestionEmbad = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setTitle("إقتراح")
      .setDescription(suggestion.join(" "))
      .setThumbnail(message.guild.iconURL())
      .setTimestamp()
      .setColor("#0099ff");

    owner.send(SuggestionEmbad).then(Send => {
      if (owner) return message.channel.send(`شكرًا لك على الإقتراح ${message.author}`).then(msg => msg.delete({ timeout: 2000 }));
    }).catch(error => message.channel.send(`لا يمكنني إرسال الرساله بسبب خطأ:\n\`${error.message}\``));
  }
};
