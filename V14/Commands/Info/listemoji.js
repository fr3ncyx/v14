const { SlashCommandBuilder, CommandInteraction, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("emojis")
    .setDescription("Displays guilds emojis."),
  execute(interaction, client) {
    const emojiList = interaction.guild.emojis.cache.map((e) => `${e} | \`${e}\``).join("\n");
    const embed = new EmbedBuilder()
      .setTitle(`Emojis`)
      .setDescription(`${emojiList}`)

    interaction.reply({ embeds: [embed] });
  },
};
