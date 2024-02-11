const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setautorole")
        .setDescription("Questo comando serve per impostare il ruolo dei nuovi utenti")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addRoleOption(option =>
            option.setName("role")
                .setDescription("Questo è il ruolo che vuoi come autorole")
                .setRequired(true)
        ),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
            return await interaction.reply({ content: "Non puoi impostare l'autorole perché non ne hai il permesso", ephemeral: true });

        const role = interaction.options.getRole("role");

        await db.set(`autorole_${interaction.guild.id}`, role.id);


        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`:white_check_mark: Il tuo autorole è stato impostato sul ruolo: ${role}`)

        await interaction.reply({ embeds: [embed] });
    }

}