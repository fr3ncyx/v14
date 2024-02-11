const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits}= require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Sbanna un utente dal server discord")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(option =>
        option.setName("user-id")
        .setDescription("Inserisci l'id dell'utente che vuoi sbannare")
        .setRequired(true)
        ),
    async execute(interaction) {
        const {channel,options} = interaction;

        const userId = options.getString("user-id");

        try {
            await interaction.guild.members.unban(userId);

            const embed = new EmbedBuilder()
            .setDescription(`Sbannato con successo l'id ${userId} dal server`)
            .setColor(0x5fb041)
            .setTimestamp();

            await interaction.reply({
                embeds: [embed],
            })
        } catch (err) {
            console.log(err);

            const errEmbed = new EmbedBuilder()
                .setDescription(`Per favore fornisci un ID utente valido`)
                .setColor(0xc72c3b)

            interaction.reply({embeds: [errEmbed], ephemeral: true})
        }
    }
}