const Commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const {
    statusMessages,
    suggestionCache,
} = require("../../features/features/suggestions");

module.exports = class SuggestionCommand extends (
    Commando.Command
) {
    constructor(client) {
        super(client, {
            name: "suggestion",
            description: "يحدّث حالة الاقتراح",
            group: "help",
            memberName: "suggestion",
            userPermissions: ["ADMINISTRATOR"],
            aliases: ["sug"],
            argsType: "multiple",
        });
    }

    async run(message, args) {
        const messageId = args.shift();
        const status = args.shift();
        const reason = args.join(" ");

        if (!messageId) return;
        if (!status) return;

        const newStatus = statusMessages[status];
        if (!newStatus) {
            return message.reply(
                `حاله غير معروفه "${status}"، الرجاء إستخدام | **${Object.keys(
                    statusMessages
                ).join(" **أو** ")}**`
            );
        }

        const channelId = suggestionCache();
        if (!channelId) {
            return message.reply("حدث خطأ ، يرجى الإبلاغ عن هذا");
        }

        const { guild } = message;
        const channel = guild.channels.cache.get(channelId);
        if (!channel) {
            return message.reply("لم تعد قناة الاقتراح موجوده");
        }

        const targetMessage = await channel.messages.fetch(
            messageId,
            false,
            true
        );
        if (!targetMessage) {
            return message.reply("هذه الرساله لم تعد موجوده");
        }
        message.delete();

        const oldEmbed = targetMessage.embeds[0];
        const embed = new MessageEmbed()
            .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL)
            .setDescription(oldEmbed.description)
            .setColor(newStatus.color)
            .setFooter("هل تريد اقتراح شيء؟ ببساطه اكتبه في هذه القناة");

        if (oldEmbed.fields.length === 2) {
            embed.addFields(oldEmbed.fields[0], {
                name: "الحاله",
                value: `${newStatus.text}${reason ? ` السبب: ${reason}` : ""}`,
            });
        } else {
            embed.addFields({
                name: "الحاله",
                value: `${newStatus.text}${reason ? ` السبب: ${reason}` : ""}`,
            });
        }

        targetMessage.edit(embed).then((Send) => {
            if (targetMessage)
                return message
                    .reply("لقد تم!")
                    .then((msg) => msg.delete({ timeout: 1000 }));
        });
    }
};
