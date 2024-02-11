const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const accountSchema = require("../../Models/Account");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("economy-withdraw")
        .setDescription("Withdraw money from your bank into your wallet.")
        .addStringOption(option =>
            option.setName("amount")
                .setDescription("Enter your withdraw amount.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { options, user, guild } = interaction;


        const Amount = options.getString("amount")

        let Data = await accountSchema.findOne({ Guild: interaction.guild.id, User: user.id }).catch(err => { })
        if (!Data) return interaction.reply({ content: "Please create an economy account first" })//puoi aggiungere ephemeral: true se cambiassi idea

        if (Amount.toLowerCase() === "all") {
            if (Data.Bank === 0) return interaction.reply({ content: "You don't have money in your bank to withdraw it into your wallet." })

            Data.Wallet += Data.Bank
            Data.Bank = 0

            await Data.save()

            return interaction.reply({ content: "All your money has been withdrawed" })
        } else {
            const Converted = Number(Amount)

            if (isNaN(Converted) === true) return interaction.reply({ content: `The amount can only be a number or \`all\`! ` })
            if (Data.Bank < parseInt(Converted) || Converted === Infinity) return interaction.reply({ content: "You don't have money in your bank to withdraw it into your wallet." })

            Data.Wallet += parseInt(Converted)
            Data.Bank -= parseInt(Converted)
            Data.Bank = Math.abs(Data.Bank)

            await Data.save()

            const embed = new EmbedBuilder()
                .setColor("Yellow")
                .setDescription(`Successfully ${parseInt(Converted)}$ withdrawed into your wallet.`)
                .setTimestamp()

            return interaction.reply({ embeds: [embed] })
        }
    }
}