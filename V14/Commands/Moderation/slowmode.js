const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Set slowmode to a channel")
    .addChannelOption(option =>
        option.setName("channel")
        .setDescription("channel to set slowmode")
        .setRequired(true)
    )
    .addNumberOption(option =>
        option.setName("amount")
        .setDescription("amount of second of slowmode")
        .setRequired(true)
    ),

    async execute(interaction) {
        const { options } = interaction;

        const channel = options.getChannel("channel")
        const time = options.getNumber("amount")

        if (!time) return interaction.reply({ content: "Please provide a time in second"})
        if (isNaN(time)) return interaction.reply({content: "Please provide a valid numer"})

        await channel.setRateLimitPerUser(time, 'No reason')
        channel.send(`Successfully set the slowmode in ${channel} with ${time} seconds`)
    }
}