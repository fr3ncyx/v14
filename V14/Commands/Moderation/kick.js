const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("espelli un utente dal server discord")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption(option =>
        option.setName("target")
        .setDescription("Utente da espellere")
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName("reason")
        .setDescription("Ragione dell'esplusione")
        ),

    async execute(interaction) {
        const {channel,options} = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "Non è stato fornito un motivo";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Non puoi eseguire nessuna azione su ${user.username} dal momento che ha un ruolo superiore`)
            .setColor(0xc72c3b)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({embeds: [errEmbed], ephemeral: true});

        await member.kick(reason);

        const embed = new EmbedBuilder()
            .setDescription(`Espulso con successo l'utente ${user} per il seguente motivo: ${reason}`)
            .setColor("Green")

        await interaction.reply({
            embeds: [embed],
        });
    }    
}