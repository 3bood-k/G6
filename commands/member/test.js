const Commando = require("discord.js-commando");

module.exports = class Test extends (
    Commando.Command
) {
    constructor(client) {
        super(client, {
            name: "test",
            description: "testing a command",
            group: "member",
            memberName: "test",
            ownerOnly: true,
            aliases: ["t"],
        });
    }

    async run(message) {
        message.reply("هلا");
    }
};
