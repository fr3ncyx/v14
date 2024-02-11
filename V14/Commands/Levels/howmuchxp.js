const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Levels = require("discord.js-leveling");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("howmuchxp")
        .setDescription("Guarda quanta esperienza ti manca per salire di livello")
        .addIntegerOption(option =>
            option.setName("level")
                .setDescription("Livello desiderato.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const { options } = interaction;

        const level = options.getInteger("level");

        const xpAmount = Levels.xpFor(level);

        interaction.reply({ content: `Hai bisogno di ${xpAmount} xp per raggiungere il livello ${level}.`, ephemeral: true });
    }
}