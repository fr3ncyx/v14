const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("risponderà con pong")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // pernesso solo agli amministratori
    async execute(interaction) {
        const { member } = interaction;

        const embed = new EmbedBuilder()
        .setDescription("Pong!")
        .setFooter({ text: `Azone eseguita da: ${member.user.tag}`})
        .setTimestamp();

        await interaction.reply({embeds: [embed], ephemeral: true})
    },
};