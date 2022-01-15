const { MessageEmbed } = require("discord.js");
const channel = require("../../assets/json/channel.json");
const suggestionCache = channel.Suggestion;

const statusMessages = {
    انتظر: {
        text: "📊 في انتظار أراء المجتمع ، يرجى التصويت!",
        color: 0xffea00,
    },
    نعم: {
        text: "✅ الفكره مقبوله!",
        color: 0x34eb5b,
    },
    لا: {
        text: "❌ لم تقبل الفكره، شكرًا لك على الاقتراح",
        color: 0xc20808,
    },
};

module.exports = (client) => {
    client.on("message", (message) => {
        const { channel, content, member } = message;

        const cachedChannelId = suggestionCache;
        if (
            cachedChannelId &&
            cachedChannelId === channel.id &&
            !member.user.bot
        ) {
            message.delete();

            const status = statusMessages.انتظر;
            const embed = new MessageEmbed()
                .setColor(status.color)
                .setAuthor(member.displayName, member.user.displayAvatarURL())
                .setDescription(content)
                .addFields({ name: "الحاله", value: status.text })
                .setFooter("هل تريد اقتراح شيء؟ ببساطه اكتبه في هذه القناة");

            channel.send(embed).then((message) => {
                message.react("👍").then(() => {
                    message.react("👎");
                });
            });
        }
    });
};

module.exports.statusMessages = statusMessages;
module.exports.suggestionCache = () => {
    return suggestionCache;
};
