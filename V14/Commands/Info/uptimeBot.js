const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, client } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("uptime")
  .setDescription("Replica con il tempo di attività online del bot"),
  async execute(interaction, client) {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 23
    let minutes = Math.floor(client.uptime / 60000) % 60
    let seconds = Math.floor(client.uptime / 1000) % 60
    const embed = new EmbedBuilder()
    .setTitle("Tempo online")
    .setDescription(`Il mio tempo di attivà online è di: \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds`)
    .setColor("#0155b6")
    await interaction.reply({ embeds: [embed], ephemeral: true})
  }
}