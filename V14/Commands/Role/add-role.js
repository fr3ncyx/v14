const rrSchema = require("../../Models/ReactionRoles");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addrole")
        .setDescription("Aggiungi al custom reaction roles.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addRoleOption(option =>
            option.setName("role")
                .setDescription("Ruolo da assegnare")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Descrizione del ruolo")
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName("emoji")
                .setDescription("Emoji per il ruolo")
                .setRequired(false)
        ),
    async execute(interaction) {
        const { options, guildId, member } = interaction;

        const role = options.getRole("role");
        const description = options.getString("description")
        const emoji = options.getString("emoji");

        try {

            if (role.position >= member.roles.highest.position)
                return interaction.reply({ content: "Non ho il permesso per questa azione.", ephemeral: true });

            const data = await rrSchema.findOne({ GuildID: guildId});

            const newRole = {
                roleId: role.id,
                roleDescription: description || "Nessuna descrizione",
                roleEmoji: emoji  || "",
            }

            if (data){
                let roleData = data.roles.find((x) => x.roleId === role.id)

                if (roleData) {
                    roleData = newRole;
                } else {
                   data.roles = [...data.roles, newRole] 
                }

                await data.save();
            } else {
                await rrSchema.create({
                    GuildID: guildId,
                    roles: newRole,
                });
            }

            return interaction.reply({content:  `Creato il nuovo ruolo **${role.name}**`});

        } catch (err) {
            console.log(err)
        }
    }
}