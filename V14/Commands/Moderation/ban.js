const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Embed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Banna un utente dal server")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(option =>
        option.setName("target")
        .setDescription("Utente da bannare")
        .setRequired(true)
        )
    .addStringOption(option =>
        option.setName("reason")
        .setDescription("Motivo del ban")
    ),

    async execute(interaction) {
        const { channel, options } = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "Nessun motivo fornito";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
        .setDescription(`Non puoi eseguire nessuna azione su ${user.username} dal momento che ha un ruolo superiore`)
        .setColor(0xc72c3b);

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({embeds: [errEmbed], ephemeral: true});

        await member.ban({reason});

        const embed = new EmbedBuilder()
        .setDescription(`Bannato con successo l'utente ${user} per il seguente motivo: ${reason}`)
        .setColor(0x5fb041)
        .setTimestamp()

        await interaction.reply({
            embeds: [embed]
        })
    }
}