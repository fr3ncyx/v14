const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler")
const { loadEvents } = require("../../Handlers/eventHandler")

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("ricarica eventi/comandi")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => 
    options
    .setName("events")
    .setDescription("ricarica i tuoi eventi"))
    .addSubcommand((options) => 
    options
    .setName("commands")
    .setDescription("ricarica i tuoi comandi")),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand();
        const embed = new EmbedBuilder()
        .setTitle("💻 | Developer")
        .setColor("Blue")

        const { user } = interaction; 

        if (user.id !== "770613024129417256" && user.id !== "968071380635648043") return interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("Red").setDescription("This command in only avaible for the  Bot Developers")
            ],
            ephemeral: true
        })
        switch(sub) {
            case "events": {
                loadEvents(client)
                interaction.reply({ embeds: [embed.setDescription("✅ Commands reloaded!")]})
                console.log(`${user.tag} has reloaded the events`)
            }
            break;
            case "commands" : {
                loadCommands(client)
                await interaction.reply({ embeds: [embed.setDescription("✅ Events reloaded!")]})
                console.log(`${user.tag} has reloaded the commands`)
            }
            break;
        }
    }

}