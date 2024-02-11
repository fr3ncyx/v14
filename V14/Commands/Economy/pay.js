const { SlashCommandBuilder, Client, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const accountSchema = require("../../Models/Account");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("economy-pay")
        .setDescription("Pay someone in the economy system.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option =>
            option.setName("user")
                .setDescription("The user whom you want to pay money.")
                .setRequired(true)
        )
        .addNumberOption(option =>
            option.setName("amount")
                .setDescription("The amount which the user should get receive.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { user, options, guild } = interaction;

        const Member = options.getUser("user")
        let amount = options.getNumber("amount")
        const sender = user;

        let data = await accountSchema.findOne({ Guild: interaction.guild.id, User: user.id }).catch(err => { })
        if (!data) return interaction.reply({ content: "Plese create an economy account first.", ephemeral: true })

        let Data = await accountSchema.findOne({ Guild: interaction.guild.id, User: Member.id }).catch(err => { })
        if (!Data) return interaction.reply({ content: "This user has no economy account.", ephemeral: true })

        
        const Sender = await accountSchema.findOne({
            Guild: interaction.guild.id,
            User: sender.id
        })

        const MoneyReceiver = await accountSchema.findOne({
            Guild: interaction.guild.id,
            User: Member.id
        })

        if (Sender.Wallet < amount) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Red")
                        .setDescription(`You don't have enough money. \nYou have: ${Sender.Wallet} \nAmount: ${amount}`)
                ], ephemeral: true
            })
        }

        if (sender === Member) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Red")
                        .setDescription(`You can't money to yourself!`)
                ], ephemeral: true
            })
        }

        const dataSend = await accountSchema.findOne({
            Guild: interaction.guild.id,
            User: sender.id
        })
        dataSend.Wallet -= amount
        dataSend.save()

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
                    .setDescription(`You've sended ${amount}$ to ${Member}`)
                    .setTimestamp()
            ]
        })
    }
}