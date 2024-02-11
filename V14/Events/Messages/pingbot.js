const { EmbedBuilder, PermissionFlagsBits} = require("discord.js")
const client = require("../../index")

module.exports = {
    name: "messageCreate",

    async execute(message) {
        if (message.content === `<@${client.user.id}>`) {
            if (message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
              message.channel.send({
                embeds: [
                  new EmbedBuilder()
                    .setColor('0x2f3136')
                    .setTitle(`${client.user.username} Help`)
                    .setDescription(`
                  • Default prefix: \`/\`
                  • View commands: \`/commandlist\`
                  • Current serving: \`${client.guilds.cache.size}\` servers
                  `)
                    .setTimestamp()
                ]
              })
            } else {
              return;
            }
          }
    }
}