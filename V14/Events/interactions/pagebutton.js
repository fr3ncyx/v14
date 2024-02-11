const { EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        const { member, guildId, customId, message } = interaction;

        if (!interaction.isButton()) return;

        if (customId === "2" || "3") {
            if (!member.permissions.has(PermissionFlagsBits.Administrator))
                return interaction.reply({ content: "Non hai il permesso per eseguire questa azione", ephemeral: true });

                const embed = message.embeds[0];
                const button2 = new ActionRowBuilder()
                .setComponents(
                    new ButtonBuilder()
                    .setCustomId("2").setLabel("Page 2").setStyle(ButtonStyle.Primary)
                )
                const button3 = new ActionRowBuilder()
                .setComponents(
                    new ButtonBuilder()
                    .setCustomId("3").setLabel("Page 3").setStyle(ButtonStyle.Primary)
                )

                switch (customId) {
                    case "2":
                        const acceptedEmbed = new EmbedBuilder().setColor("Green").setTitle("test")
                        .addFields({name: "AA", value: "dòlj"});

                        message.edit({embeds: [acceptedEmbed], components: [button2, button3]});
                        interaction.reply({content: "Ecco a te la seconda pagina", ephemeral: true});
                    break;
                    case "3":
                        const declinedEmbed = new EmbedBuilder().setColor("Green").setTitle("test")
                        .addFields({name: "ciao", value: "dòlj"});

                        message.edit({embeds: [declinedEmbed], components: [button2, button3]});
                        interaction.reply({content: "Ecco a te la terza pagina", ephemeral: true});
                    break;
                }
            ;
        }
    }
}