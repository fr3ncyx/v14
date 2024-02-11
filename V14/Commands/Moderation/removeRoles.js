const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role-2")
    .setDescription("Gestisci i ruoli del server o dei membri.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addSubcommand((subcommand) => subcommand
      .setName("remove")
      .setDescription("Rimuovi un ruolo da un utente.")
      .addRoleOption((option) => option
        .setName("role")
        .setDescription("Il ruolo che vuoi rimuovere dall'utente.")
        .setRequired(true))
      .addUserOption((option) => option
        .setName("user")
        .setDescription("L'utente al quale vuoi rimuovere il ruolo.")
        .setRequired(true)
      )),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'remove') {
      try {
        const member = interaction.options.getMember('user');
        const role = interaction.options.getRole('role');
        
        await member.roles.remove(role)

        const embed = new EmbedBuilder()
          .setTitle('Ruolo rimosso')
          .setDescription(`Rimosso con successo il ruolo: ${role} dal membro: ${member}`)
          .setColor('Green')
          .setTimestamp()
          .setThumbnail(member.user.displayAvatarURL())
          .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

        interaction.reply({ embeds: [embed] , ephemeral: true })
      } catch {
        return interaction.reply({ content: `Non sono riuscito a rimuovere il ruolo poiché l'utente ha un ruolo mod/amministratore. Se così non fosse, entra nel server di supporto per segnalarci dei bug: https://discord.gg/Tb7K7TqF7y .`, ephemeral: true});
    
      }
    }
  }
};