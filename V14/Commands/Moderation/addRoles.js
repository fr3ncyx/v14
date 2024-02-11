const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role-1")
    .setDescription("Gestisci i ruoli del server o dei membri.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addSubcommand((subcommand) => subcommand
      .setName("add")
      .setDescription("Aggiungi un ruolo ad un utente.")
      .addRoleOption((option) => option
        .setName("role")
        .setDescription("Il ruolo che vuoi aggiungere all'utente.")
        .setRequired(true))
      .addUserOption((option) => option
        .setName("user")
        .setDescription("L'utente al quale vuoi aggiungere il ruolo.")
        .setRequired(true)
      )),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'add') {
      try {
        const member = interaction.options.getMember('user');
        const role = interaction.options.getRole('role');
        
        await member.roles.add(role)

        const embed = new EmbedBuilder()
          .setTitle('Ruolo aggiunto')
          .setDescription(`Aggiunto con successo il ruolo: ${role} al membro: ${member}`)
          .setColor('Green')
          .setTimestamp()
          .setThumbnail(member.user.displayAvatarURL())
          .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

        interaction.reply({ embeds: [embed] , ephemeral: true })
      } catch {
        return interaction.reply({ content: `Non sono riuscito ad aggiungere il ruolo poiché l'utente ha un ruolo mod/amministratore. Se così non fosse, entra nel server di supporto per segnalarci dei bug: https://discord.gg/Tb7K7TqF7y .`, ephemeral: true});
    
      }
    }
  }
};