const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Levels = require("discord.js-leveling")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Ottieni la classifica dei rank"),
    async execute(interaction, client) {
        const { guildId } = interaction;

        const rawLeaderboard = await Levels.fetchLeaderboard(guildId, 10);

        if (rawLeaderboard.lenght < 1) return interaction.reply("Non c'è ancora nessuna classifica.");

        const embed = new EmbedBuilder();

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

        const lb = leaderboard.map(e => `**${e.position}.** ${e.username}#${e.discriminator}\n**Level:** ${e.level}\n**XP:** ${e.xp.toLocaleString()}`);

        embed.setTitle("leaderboard").setDescription(lb.join("\n\n")).setTimestamp();;

        return interaction.reply({ embeds: [embed] });
    },
};