const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const accountSchema = require("../../Models/Account");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("economy-deposit")
        .setDescription("Deposit money from your wallet into your bank.")
        .addStringOption(option =>
            option.setName("amount")
                .setDescription("Enter your deposit amount.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { options, user, guild } = interaction;


        const Amount = options.getString("amount")

        let Data = await accountSchema.findOne({ Guild: interaction.guild.id, User: user.id }).catch(err => { })
        if (!Data) return interaction.reply({ content: "Please create an economy account first" })//puoi aggiungere ephemeral: true se cambiassi idea

        if (Amount.toLowerCase() === "all") {
            if (Data.Wallet === 0) return interaction.reply({ content: "You don't have money in your bank to deposit it into your bank." })

            Data.Bank += Data.Wallet
            Data.Wallet = 0

            await Data.save()

            return interaction.reply({ content: "All your money has been deposited" })
        } else {
            const Converted = Number(Amount)

            if (isNaN(Converted) === true) return interaction.reply({ content: `The amount can only be a number or \`all\`! ` })
            if (Data.Wallet < parseInt(Converted) || Converted === Infinity) return interaction.reply({ content: "You don't have money in your wallet to deposit it into your wallet." })

            Data.Bank += parseInt(Converted)
            Data.Wallet -= parseInt(Converted)
            Data.Wallet = Math.abs(Data.Bank)

            await Data.save()

            const embed = new EmbedBuilder()
                .setColor("Yellow")
                .setDescription(`Successfully ${parseInt(Converted)}$ deposited into your bank.`)
                .setTimestamp()

            return interaction.reply({ embeds: [embed] })
        }
    }
}