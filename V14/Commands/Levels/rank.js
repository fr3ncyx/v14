const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Levels = require("discord.js-leveling")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rank")
        .setDescription("Ottieni informazioni riguardo il rank di un utente")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("Seleziona un utente")
        ),
    async execute(interaction) {
        const { options, guildId, user } = interaction;

        const member = options.getUser("user") || user;

        const levelUser = await Levels.fetch(member.id, guildId);

        const embed = new EmbedBuilder();

        if (!levelUser) return interaction.reply({ content: "Senbra che questo utente non abbia guadagnato ancora esperienza", ephemeral: true });

        embed.setDescription(`**${member.tag}** è attualmente al livello ${levelUser.level} e ha ${levelUser.xp.toLocaleString()} xp.`)
            .setColor("Random").setTimestamp();

        return interaction.reply({ embeds: [embed] })
    }
}