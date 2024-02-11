const { Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const accountSchema = require("../../Models/Account");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("economy")
        .setDescription("Create, delete or check your economy account/balance.")
        .addStringOption(option =>
            option.setName("options")
                .setDescription("Choose an option.")
                .setRequired(true)
                .addChoices(
                    { name: "Create", value: "create" },
                    { name: "Delete", value: "delete" },
                    { name: "Balance", value: "balance" }
                )
        ),

    async execute(interaction) {
        const { options, user, guild } = interaction;

        let Data = await accountSchema.findOne({ Guild: interaction.guild.id, User: user.id}).catch(err => { })

        switch (options.getString("options")) {
            case "create": {
                if (Data) return interaction.reply({ content: "You already have an economy account", ephemeral: true})

                Data = new accountSchema({
                    Guild: interaction.guild.id,
                    User: user.id,
                    Bank: 0,
                    Wallet: 1000 //l'utente ottiene 1000 crediti al suo account per averlo creato
                })

                await Data.save()

                interaction.reply({ content: `Your account has been successfully created! You've got ${Data.Wallet} at your wallet`})
            }
            break;
            case "balance": {
                if (!Data) return interaction.reply({ content: "Please create an economy account first.", ephemeral: true})

                const embed = new EmbedBuilder()
                .setTitle("Economy sistem")
                .setColor("Yellow")
                .setDescription(`**Bank:** ${Data.Bank}$\n**Wallet:** ${Data.Wallet}$\n**Total:** ${Data.Bank + Data.Wallet}$`)
                .setTimestamp()

                await interaction.reply({ embeds: [embed]})
            }
            break;
            case "delete": {
                if (!Data) return interaction.reply({ content: "Please create an economy account first.", ephemeral: true})

                await Data.delete()

                interaction.reply({content: "Your economy account for this server has been deleted"})
            }
            break;
        }
    }
}
