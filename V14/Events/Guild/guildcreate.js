const { EmbedBuilder, ChannelType} = require("discord.js")

module.exports = {
    name: "guildCreate",
    async execute(guild) {
        const topChannel = guild.channels.cache.filter(c => c.type === ChannelType.GuildText).sort((a, b) => a.rawPosition - b.rawPosition || a.id - b.id).first()

        try {
            const embed = new EmbedBuilder()
              .setColor('#2F3136')
              .setTitle('Hello!')
              .setDescription(`Thank you for adding me into your server! My command to get started is: /commandlist, type \/help\` in any channel.`);
            topChannel.send({ embeds: [embed] });
          } catch (error) {
            console.log(error);
          }
    }
}