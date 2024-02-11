const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Levels = require("discord.js-leveling");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("level")
        .setDescription("Sistema il livello di un utente")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand.setName("add")
                .setDescription("Aggiungi livelli ad un utente")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Seleziona un utente")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Quantità di livelli")
                        .setMinValue(0)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("remove")
                .setDescription("Rimuovi livelli da un utente")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Seleziona un utente")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Quantità di livelli")
                        .setMinValue(0)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("set")
                .setDescription("Imposta i livelli d un utente")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Seleziona un utente")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Quantità di livelli")
                        .setMinValue(0)
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const { options, guildId } = interaction;

        const sub = options.getSubcommand("level");
        const target = options.getUser("target");
        const amount = options.getInteger("amount");
        const embed = new EmbedBuilder();

        try {
            switch (sub) {
                case "add":
                    await Levels.appendLevel(target.id, guildId, amount);
                    embed.setDescription(`Aggiunti ${amount} livello/i a ${target}.`).setColor("Green").setTimestamp();
                    break;
                case "remove":
                    await Levels.subtractLevel(target.id, guildId, amount);
                    embed.setDescription(`Rimossi ${amount} livello/i da ${target}.`).setColor("Green").setTimestamp();
                    break;
                case "set":
                    await Levels.setLevel(target.id, guildId, amount);
                    embed.setDescription(`Impostato livello/i di ${target} a ${amount}.`).setColor("Green").setTimestamp();
                    break;
            }
        } catch (err) {
            console.log(err)
        }

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}