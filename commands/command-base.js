const { prefix } = require("../config.json");

const validatePermissions = (permissions) => {
  const validPermissions = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ];

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`ليست لديك صلاحيت "${permission}"`);
    }
  }
};

let recentlyRan = [];

module.exports = (client, commandOptions) => {
  let {
    commands,
    example = "",
    description = "",
    expectedArgs = "",
    // guildOnly = true,
    permissionError = "ليست لديك أي صلاحيات لتشغيل هاذا الأمر",
    minArgs = 0,
    maxArgs = null,
    cooldown = -1,
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions;

  if (typeof commands === "string") {
    commands = [commands];
  }

  console.log(`Registering command "${commands[0]}"`);

  if (permissions.length) {
    if (typeof permissions === "string") {
      permissions = [permissions];
    }

    validatePermissions(permissions);
  }

  client.on("message", (message) => {
    const { MessageEmbed } = require("discord.js");

    const { member, content, guild } = message;

    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`;
      if (message.channel.type === "dm") return;

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {
        for (const permission of permissions) {
          // if (alias.guildOnly || message.channel.type === "dm") return;
          if (!member.hasPermission(permission)) {
            message.reply(permissionError);
            return;
          }
        }

        for (const requiredRole of requiredRoles) {
          // if (alias.guildOnly || message.channel.type === "dm") return;
          const role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          );

          if (!role || !member.roles.cache.has(role.id)) {
            message.reply(
              `يجب أن يكون لديك رتبة "${requiredRole}" لإستخدام هذا الأمر.`
            );
            return;
          }
        }

        let cooldownString = `${guild.id}-${member.id}-${commands[0]}`;
        if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
          message.channel.send(
            `${message.author}, لا يمكنك إستخدام هاذا الأمر الآن، الرجاء الإنتظار..`
          );
          return;
        }

        const arguments = content.split(/[ ]+/);
        arguments.shift();

        if (
          arguments.length < minArgs ||
          (maxArgs !== null && arguments.length > maxArgs)
        ) {
          const helpEmbed = new MessageEmbed();
          if (alias) helpEmbed.setTitle(`**الأمر**: ${alias}`);
          if (description) helpEmbed.setDescription(description);
          if (expectedArgs)
            helpEmbed.addFields({
              name: "**الإستخدام**:",
              value: `${prefix}${alias} ${expectedArgs}`,
            });
          if (example)
            helpEmbed.addFields({
              name: "**مثال**:",
              value: `${prefix}${alias} ${example}`,
            });

          message.channel.send(helpEmbed);
          return;
        }

        if (cooldown > 0) {
          recentlyRan.push(cooldownString);

          setTimeout(() => {
            recentlyRan = recentlyRan.filter((string) => {
              return string !== cooldownString;
            });
          }, 1000 * cooldown);
        }
        // if (alias.guildOnly === true || message.channel.type === "dm") return;

        // Handle the custom command code
        callback(message, arguments, arguments.join(" "), client, MessageEmbed);

        return;
      }
    }
  });
};
