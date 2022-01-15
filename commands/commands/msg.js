module.exports = {
  commands: ["msg", "m"],
  description: "يتكلم البوت مثل ما تقول",
  minArgs: 1,
  callback: (message, arguments, text, client, MessageEmbed) => {
    if (message.channel.type === "dm") return;
    const content = message.content.split(" ").slice(1);
    message.channel.send(content.join(" "));
  },
  permissions: "ADMINISTRATOR",
};
