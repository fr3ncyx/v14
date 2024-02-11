const { EmbedBuilder } = require("discord.js");
const Levels = require("discord.js-leveling");

module.exports = {
    name: "messageCreate",

    async execute(message) {
        if (!message.guild || message.author.bot) return;

        if (message.content.lenght < 3) return;//se i messaggi hanno meno di 3 lettere non vengono conteggiate nel counting dell'exp

        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);

        if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id);

            const embed = new EmbedBuilder()
                .setTitle("Nuovo livello!")
                .setDescription(`**GG**${message.author}, sei appena salito al livello **${user.level + 1}**!`)
                .setColor("Random")
                .setTimestamp();

            const sendEmbed = await message.channel.send({embeds: [embed]});
            sendEmbed.react('🥳');
        }
    }
}