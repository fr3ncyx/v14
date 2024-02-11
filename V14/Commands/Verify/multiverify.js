const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const multiVerify = require("../../Models/Verify")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("multiverify")
        .setDescription("System of verification multiguilded.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Send the verification embed in this chnanel.')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName("role")
                .setDescription("Role to be assigned.")
                .setRequired(true)
        ),

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

        try {
            const data = await multiVerify.findOne({ Guild: interaction.guild.id })

            const verifiedRole = {
                roleId: roleId.id
            }

            if (data) {
                let roleData = data.roles.find((x) => x.roleId === roleI.id)

                if (roleData) {
                    roleData = verifiedRole;
                } else {
                    data.roles = [...data.roles, verifiedRole]
                }

                

                await data.save()

                
            }
        } catch (err) {
            console.log(err)
        }
    }
}