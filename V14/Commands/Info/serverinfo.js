const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Shows information about the server.")
        .setDMPermission(false),

    async execute(interaction) {
        const { guild } = interaction;
        const { members, channels, emojis, roles, stickers } = guild;

        const sortedRoles = roles.cache.map(role => role).slice(1, roles.cache.size).sort((a, b) => b.position - a.position);
        const userRoles = sortedRoles.filter(role => !role.managed);
        const managedRoles = sortedRoles.filter(role => role.managed);
        const botCount = members.cache.filter(member => member.user.bot).size

        const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
            let totalLength = 0;
            const result = [];

            for (const role of roles) {
                const roleString = `<@&${role.id}>`;

                if (roleString.length + totalLength > maxFieldLength)
                    break;

                totalLength += roleString.length + 1
                result.push(roleString);
            }

            return result.length;
        }

        const splitPascal = (string, separator) => string.split(/(?=[A-U])/).join(separator);
        const toPascalCase = (string, separator = false) => {
            const pascal = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase().replace(/[a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
            return separator ? splitPascal(pascal, separator) : pascal;
        };

        const getChannelTypeSize = type => channels.cache.filter(channel => type.includes(channel.type)).size;

        const totalChannels = getChannelTypeSize([ChannelType.GuildText, ChannelType.GuildNews, ChannelType.GuildVoice, ChannelType.GuildStageVoice, ChannelType.GuildForum, ChannelType.GuildPublicThread, ChannelType.GuildPrivateThread, ChannelType.GuildNewsThread, ChannelType.GuildCategory]);

        const embed = new EmbedBuilder()
            .setColor(0xf4c2c2)
            .setTitle(`${guild.name}'s information`)
            .setThumbnail(guild.iconURL({ size: 1024 }))
            .setImage(guild.bannerURL({ size: 1024 }))
            .setFooter({text: "Nodefy", iconURL: "https://emojipedia-us.s3.amazonaws.com/source/skype/289/cyclone_1f300.png"})
            .addFields(
                { name: "Server Description", value: `${guild.description}` || "This server has no description." },
                {
                    name: "General Info",
                    value: [
                        `👑 | <@${guild.ownerId}>`,
                        `🔨 | Created <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                        `🔢 | ${guild.id} is this servers ID`,
                        `⌨ | ${guild.vanityURLCode}`
                    ].join("\n")
                },
                {
                    name: `Members (${guild.memberCount})`,
                    value: [
                        `👤 | ${guild.memberCount - botCount} are human`,
                        `⚙ | ${botCount} are bots`
                    ].join("\n"),
                    inline: true
                },
                {
                    name: `Boosts (${guild.premiumSubscriptionCount})`,
                    value: [
                        `📈 | We are level ${guild.premiumTier}`,
                        `💎 | ${guild.members.cache.filter(member => member.roles.premiumSubscriptionRole).size} simps`,
                        `🤔 | ${guild.members.cache.filter(member => member.roles.premiumSince).size} total boosts(?)`
                    ].join("\n"),
                    inline: true
                },
                {
                    name: `Emoji (${emojis.cache.size + stickers.cache.size})`,
                    value: [
                        `🗿 | ${emojis.cache.filter(emoji => !emoji.animated).size} static emoji`,
                        `📺 | ${emojis.cache.filter(emoji => emoji.animated).size} animated emoji`,
                        `📟 | ${stickers.cache.size} stickers`
                    ].join("\n"),
                    inline: true
                },
                { name: `User Roles (${maxDisplayRoles(userRoles)} of ${userRoles.length})`, value: `${userRoles.slice(0, maxDisplayRoles(userRoles)).join(" ") || "None"}` },
                { name: `Bot Roles (${maxDisplayRoles(managedRoles)} of ${managedRoles.length})`, value: `${managedRoles.slice(0, maxDisplayRoles(managedRoles)).join(" ") || "None"}` },
                {
                    name: `Channels (${totalChannels})`,
                    value: [
                        `💬 | ${getChannelTypeSize([ChannelType.GuildText, ChannelType.GuildForum, ChannelType.GuildNews])} text channels`,
                        `🎙 | ${getChannelTypeSize([ChannelType.GuildVoice, ChannelType.GuildStageVoice])} voice channels`,
                        `🧵 | ${getChannelTypeSize([ChannelType.GuildPublicThread, ChannelType.GuildPrivateThread, ChannelType.GuildNewsThread])} threads`
                    ].join("\n"),
                    inline: true
                },
            )
        interaction.reply({ embeds: [embed] })
    }
};