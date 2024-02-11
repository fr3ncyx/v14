const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("flip")
        .setDescription("Rispondi con testa o croce randomicamente."),

    async execute(interaction) {
        let michr = [
            "Testa",
            "Croce"
        ];
        let mich = michr[Math.floor(Math.random() * michr.length)];

        let embed = new EmbedBuilder()

        interaction.reply({ embeds: [embed.setTitle("Risultato del testa o croce").setDescription(`E' uscito **${mich}**!`).setColor(0x2f3136).setTimestamp()] })


    }

}