const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verifica')
        .setDescription('Imposta il canale di verifica')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Manda un embed in questo canale')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName("role")
            .setDescription("Ruolo da assegnare alla verifica")
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const { customId, options, guild, member } = interaction;
        const roleId = options.getRole("role");
        const channel = options.getChannel('channel');
        const verifyEmbed = new EmbedBuilder()
            .setTitle("Verifica")
            .setDescription('Clicca il bottone per verificarti e avere accesso ai canali')
            .setColor(0x5fb041)
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('verify').setLabel('Verificati').setStyle(ButtonStyle.Success),
                ),
            ],
        })
        if (customId == "verify") {
            const role = roleId;
            return interaction.member.roles.add(roleId).then((member) =>
              interaction.reply({
                content: `${roleId} has been assigned to you.`,
                ephemeral: true,
              })
            );
          }
        if (!sendChannel) {
            return interaction.reply({ content: 'There was an error! Try again later.', ephemeral: true });
        } else {
            return interaction.reply({ content: 'ti è stato assegnato con successo!', ephemeral: true });
        } 
        
    },
};