const { MessageEmbed } = require("discord.js");
const Commando = require("discord.js-commando");

module.exports = class Example extends (
    Commando.Command
) {
    constructor(client) {
        super(client, {
            name: "example",
            description: "example a command",
            group: "moderation",
            memberName: "example",
            ownerOnly: true,
            guildOnly: true,
            aliases: ["e"],
            examples: ["test"],
            usage: "test",
            clientPermissions: ["SEND_MESSAGES"],
            userPermissions: ["SEND_MESSAGES"],
        });
    }

    async run(message, args, fromPattern, result) {
        message
            .reply("Hi testing!")
            .then((msg) => msg.edit("Your ping is here"));

        const PingEmbed = new MessageEmbed();
        message.channel
            .send("هلا والله!")
            .then((msg) =>
                msg.edit(
                    "",
                    PingEmbed.setDescription(
                        `**msالوقت المستغرق: \`${
                            Date.now() - message.createdTimestamp
                        }\`**`
                    ).setColor("RANDOM")
                )
            )
            .catch(console.error);
    }
};
