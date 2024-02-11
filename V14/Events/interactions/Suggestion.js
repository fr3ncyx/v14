const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const suggestionSchema = require("../../Models/Suggestion");

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        const { member, guildId, customId, message } = interaction;

        if (!interaction.isButton()) return;

        if (customId === "suggest-accept" || "suggest-decline") {
            if (!member.permissions.has(PermissionFlagsBits.Administrator))
                return interaction.reply({ content: "Non hai il permesso per eseguire questa azione", ephemeral: true });

            suggestionSchema.findOne({ GuildID: guildId, MessageID: message.id }, async (err, data) => {
                if (err) throw err

                if (data) return interaction.reply({ content: "nessun dato trovato", ephemeral: true});

                const embed = message.embeds[0];

                if (!embed)
                    return interaction.reply({ content: "Nessun embed trovato", ephemeral: true });

                switch (customId) {
                    case "suggest-accept":
                        embed.data.fields[2] = {name: "Stato", value: "Accettato", inline: true};
                        const acceptedEmbed = EmbedBuilder.from(embed).setColor("Green");

                        message.edit({embeds: [acceptedEmbed]});
                        interaction.reply({content: "Suggerimento accettato con successo", ephemeral: true});
                    break;
                    case "suggest-decline":
                        embed.data.fields[2] = {name: "Stato", value: "rifiutato", inline: true};
                        const declinedEmbed = EmbedBuilder.from(embed).setColor("Red");

                        message.edit({embeds: [declinedEmbed]});
                        interaction.reply({content: "Suggerimento rifiutato con successo", ephemeral: true});
                    break;
                }
            });
        }
    }
}