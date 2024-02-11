const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('latency')
        .setDescription('View the latency of the bot.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {

        await interaction.deferReply()

        const embed = new EmbedBuilder()
            .setDescription(`Latency of **${client.user.username}**: **${client.ws.ping} ms**`)
            .setColor("0x2f3136")
            .setTimestamp();

        interaction.followUp({ embeds: [embed] })
    }
}