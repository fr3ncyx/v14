const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Levels = require("discord.js-leveling");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("xp")
        .setDescription("Sistema l'xp di un utente")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand.setName("add")
                .setDescription("Aggiungi xp ad un utente")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Seleziona un utente")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Quantità di xp")
                        .setMinValue(0)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("remove")
                .setDescription("Rimuovi xp da un utente")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Seleziona un utente")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Quantità di xp")
                        .setMinValue(0)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("set")
                .setDescription("Imposta l'xp d un utente")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Seleziona un utente")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Quantità di xp")
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
                    await Levels.appendXp(target.id, guildId, amount);
                    embed.setDescription(`Aggiunti ${amount} xp a ${target}.`).setColor("Green").setTimestamp();
                    break;
                case "remove":
                    await Levels.subtractXp(target.id, guildId, amount);
                    embed.setDescription(`Rimossi ${amount} xp da ${target}.`).setColor("Green").setTimestamp();
                    break;
                case "set":
                    await Levels.setXp(target.id, guildId, amount);
                    embed.setDescription(`Impostata l'xp di ${target} a ${amount}.`).setColor("Green").setTimestamp();
                    break;
            }
        } catch (err) {
            console.log(err)
        }

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}