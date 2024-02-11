const rrSchema = require("../../Models/ReactionRoles");
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, SelectMenuBuilder, CommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("panel")
        .setDescription("Ottieni il pannelo del reaction role")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        const { options, guildId, guild, channel } = interaction;

        try {
            const data = await rrSchema.findOne({ GuildID: guildId });

            if (!data.roles.length > 0)
                return interaction.reply({ content: "Non ho il permesso per eseguire questa azione.", ephemeral: true });

            const panelEmbed = new EmbedBuilder()
            .setDescription("Per favore seleziona un ruolo qui sotto.")
            .setColor("Random")

            const options = data.roles.map(x =>{
                const role = guild.roles.cache.get(x.roleId);

                return {
                    label: role.name,
                    value: role.id,
                    description: x.roleDescription,
                    emoji: x.roleEmoji || undefined
                };
            });

            const menuComponents = [
                new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder()
                    .setCustomId('reaction-roles')
                    .setMaxValues(options.length)
                    .setMinValues(0)
                    .addOptions(options),
                ),
            ];

            channel.send({ embeds: [panelEmbed], components: menuComponents});

            return interaction.reply({ content: "Panel inviato con successo", ephemeral: true})
        } catch (err) {
            console.log(err)
        }
    }
}