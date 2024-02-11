const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, WebhookClient, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("membercount")
        .setDescription("Mostra il numero di utenti e bot presenti nel server."),
    async execute(interaction) {
        const m = interaction.guild.memberCount;
        const b = interaction.guild.members.cache.filter(member => member.user.bot).size;
        const embed = new EmbedBuilder();

        await interaction.reply({
            embeds: [embed.setTitle("Member Count").setDescription(`Qui ci sono le statistiche correnti dei membri presenti nel server e dei bot.`)
                .addFields(
                    { name: "\`👤\` Attuali membri del server", value: `${m - b}`, inline: true },
                    { name: "\`🤖\` Attuali bot del server", value: `${b}`, inline: true },
                )
                .setColor(0x2f3136).setTimestamp()], ephemeral: true
        });
    },
};