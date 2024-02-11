const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonComponent} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("pagebutton")
    .setDescription("."),
    async execute(interaction) {
        const { customId } = interaction;
        const embed1 = new EmbedBuilder()
        .setTitle("test")
        .addFields(
            {name: "lsjk", value: "dòlj"}
        )
        .addFields(
            {name: "ihdsl", value: "dlka"}
        )
        .addFields(
            {name: "sòjdlk", value: "djlik"}
        )
        const embed2 = new EmbedBuilder()
        .setTitle("test")
        .addFields({name: "AA", value: "dòlj"})
        .addFields(
            {name: "BB", value: "dlka"}
        )
        .addFields(
            {name: "CC", value: "djlik"}
        )
        const embed3 = new EmbedBuilder()
        .setTitle("test")
        .addFields({name: "ciao", value: "dòlj"})
        .addFields(
            {name: "tu", value: "dlka"}
        )
        .addFields(
            {name: "sei", value: "djlik"}
        )
        const button1 = new ActionRowBuilder()
        .setComponents(
            new ButtonBuilder()
            .setCustomId("1").setLabel("Page 1").setStyle(ButtonStyle.Primary)
        )
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
        interaction.reply({embeds: [embed1], components: [button2, button3]})

        if (customId == "2") {
            interaction.editReply({embeds: [embed2], components: [button2]})
        }

        if (customId == "3") {
            interaction.editReply({embeds: [embed3], components: [button3]})
        }
    }
}