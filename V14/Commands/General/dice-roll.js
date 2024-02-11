const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("dice-roll")
    .setDescription("Lancia un dado. (1~6)"),

    async execute(interaction) {

        const choices = ["1 ", "2", "3", "4", "5", "6"]
        const randomChoice = choices[Math.floor(Math.random()*choices.length)];

        const embed = new EmbedBuilder()

        try {
            switch (randomChoice) {
                case "1":
                    embed.setTitle("🎲 | Il tuo dado è stato lanciato...").setColor("Green").setDescription("Your number is  **1**!")
                    return interaction.reply({ embeds: [embed] });
                case "2":
                    embed.setTitle("🎲 | Il tuo dado è stato lanciato...").setColor("Orange").setDescription("Your number is **2**!")
                    return interaction.reply({ embeds: [embed] });
                case "3":
                    embed.setTitle("🎲 | Il tuo dado è stato lanciato...").setColor("Aqua").setDescription("Your number is **3**!")
                    return interaction.reply({ embeds: [embed] });
                case "4":
                    embed.setTitle("🎲 | Il tuo dado è stato lanciato...").setColor("White").setDescription("Your number is **4**!")
                    return interaction.reply({ embeds: [embed] });
                case "5":
                    embed.setTitle("🎲 | Il tuo dado è stato lanciato...").setColor("Black").setDescription("Your number is**5**!")
                    return interaction.reply({ embeds: [embed] });
                case "6":
                    embed.setTitle("🎲 | Il tuo dado è stato lanciato...").setColor("Purple").setDescription("Your number is **6**!")
                    return interaction.reply({ embeds: [embed] });
            }
        } catch (err) {
            console.log(err);
            if (err) return;

            embed.setColor("Red").setDescription("⛔ |Something went wrong...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}