const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const cpuStat = require("cpu-stat")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Get information about the bot."),

    execute(interaction, client) {
        const days = Math.floor(client.uptime / 86400000);
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60

        cpuStat.usagePercent(function (error, percent) {
            if (error) return interaction.reply({ content: `${error}` })

            const memoryUsage = formatBytes(process.memoryUsage().heapUsed)
            const node = process.version
            const cpu = percent.toFixed(2)

            const embed = new EmbedBuilder()

                .setTitle("Bot information")
                .setColor("Blue")
                .addFields(
                    { name: "Developer", value: "Francy#5614", inline: true },
                    { name: "Username", value: `${client.user.username}`, inline: true },
                    { name: "ID:", value: `${client.user.id}`, inline: true },
                    { name: "Creation date", value: "27.12.2022" },
                    { name: "Help command", value: "/help" },
                    { name: "Uptime", value: `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds` },
                    { name: "Bot-ping", value: `${client.ws.ping}ms` },
                    { name: "Node version", value: `${node}` },
                    { name: "CPU usage", value: `${cpu}%` },
                    { name: "Memory usage", value: `${memoryUsage}` },
                    { name: "Servers", value:`${client.guilds.cache.size}`}
                )

            interaction.reply({ embeds: [embed] })
        })

        function formatBytes(a, b) {
            let c = 1024
            d = b || 2
            e = ['B', 'KB', 'MB', 'GB', 'TB']
            f = Math.floor(Math.log(a) / Math.log(c))

            return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f]
        }
    }
}