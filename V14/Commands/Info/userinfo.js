const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Ottieni le informazioni di un utente")
    .addUserOption((option) =>
      option.setName("user").setDescription("Seleziona un utente").setRequired(true)
    ),
  async execute(interaction) {
    let user = interaction.options.getUser("user");
    const member = await interaction.guild.members.fetch(user.id);

    const userinfoEmbed = new discord.EmbedBuilder()
      .setColor("#0155b6")
      .setThumbnail(user.displayAvatarURL())
      .setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL(),
      })
      .addFields({name: "Membro", value: `${user}`, inline: false })
      .addFields(
        {
          name: "Account creato il",
          value: `${user.createdAt.toLocaleString()}`,
          inline: true,
        },
        {
          name: "Entrato nel server il",
          value: `${interaction.guild.joinedAt.toLocaleString()}`,
          inline: true,
        },
        {
          name: "User ID",
          value: `${user.id}`,
          inline: true,
        },
        {
          name: "User Tag",
          value: `${user.tag}`,
          inline: true,
        },
        {
          name: "Username",
          value: `${user.username}`,
          inline: true,
        },
        {
          name: "E' un bot?",
          value: `${user.bot}`,
          inline: true,
        }
      )
      .addFields({name: "Ruoli", value: `${member.roles.cache.map(r => r).join(', ')}`, inline: true})
      .setFooter({
        text: `${interaction.guild}`,
      })
      .setTimestamp();

    await interaction.reply({
      embeds: [userinfoEmbed],
    });
  },
};