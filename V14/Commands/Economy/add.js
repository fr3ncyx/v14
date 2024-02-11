const { SlashCommandBuilder, Client, EmbedBuilder, PermissionFlagsBits} = require("discord.js");
const accountSchema = require("../../Models/Account");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("economy-add")
    .setDescription("Add money to someone in the economy system.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
        option.setName("user")
        .setDescription("The user whom you want to add money.")
        .setRequired(true)
    )
    .addNumberOption(option =>
        option.setName("amount")
        .setDescription("The amount which the user should receive.")
        .setRequired(true)
    ),
    async execute(interaction) {
        const { user, options, guild} = interaction;

        const Member = options.getUser("user")
        let amount = options.getNumber("amount")

        let Data = await accountSchema.findOne({ Guild: interaction.guild.id, User: Member.id }).catch(err => { })
        if (!Data) return interaction.reply({ content: "This user has no economy account.", ephemeral: true })

        const MoneyReceiver = await accountSchema.findOne({
            Guild: interaction.guild.id,
            User: Member.id
        })

        const dataReceived = await accountSchema.findOne({
            Guild: interaction.guild.id,
            User: Member.id
        })
        dataReceived.Wallet += amount
        dataReceived.save()

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("Green")
                .setDescription(`You've added ${amount}$ to ${Member}`)
                .setTimestamp()
            ]
        })
    }
}