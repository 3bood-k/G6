const { Devs } = require("../config.json");

module.exports = {
  name: "error",
  description: "اعلام مطور البوت عن وجود خطأ",
  aliases: ["خلل", "خطأ", "err"],
  usage: "[الخطأ]",
  guildOnly: true,
  cooldown: "10",
  execute(Discord, client, message) {
    if (message.deletable) message.delete();

    const error = message.content.split(" ").slice(1);
    if (!error[0]) return message.reply("الراجاء وضع الخطأ").then(msg => msg.delete({ timeout: 2000 }));
    if (parseInt(error[0]) > -10000000000) return;

    const owner = client.users.cache.get(Devs);
    const ErrorEmbad = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setTitle("خطأ")
      .setDescription(error.join(" "))
      .setThumbnail(message.guild.iconURL())
      .setTimestamp()
      .setColor("#FF0000");

    owner.send(ErrorEmbad).then(Send => {
      if (owner) return message.channel.send(`شكرًا لك على المساعده في الإبلاغ عن الخطأ ${message.author}`).then(msg => msg.delete({ timeout: 2200 }));
    }).catch(error => message.channel.send(`لا يمكنني إرسال الرساله بسبب خطأ:\n\`${error.message}\``));
  }
};
