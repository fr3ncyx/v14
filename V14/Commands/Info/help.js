const { SlashCommandBuilder, EmbedBuilder, Client, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Get something about the bot."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { guild, member } = interaction;

        const link = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1110517509238&scope=bot%20applications.commands`;
        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setURL(link)
                .setLabel("Invite Me")
                .setStyle(ButtonStyle.Link)
        );
        let embed1 = new EmbedBuilder()
            .setTitle(`Nodefy`)
            .setAuthor({ name: `${guild.name}`})
            .setDescription(`
        Welcome to the Nodefy! this bot is a multi function bot. You can choose and set everything do you want from this discord bot!
There are a lot of feature: a giveway sistem, reaction roles, meme commands, levelling sistem, calculator and moree...
To get the list of the command use /commandlist
        `)
            .addFields(
                {
                    name: "Links", value: `
                    Add me! [[click here]](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1110517509238&scope=bot%20applications.commands) 
The bot dashboard! [work in progress!] 
Support server [[join]](https://discord.gg/Tb7K7TqF7y) 
Support the project [work in progress!]`}
            )
            .setFooter({ text: `Nodefy - Asked by ${member.user.tag}`, iconURL: "https://emojipedia-us.s3.amazonaws.com/source/skype/289/cyclone_1f300.png" })
            .setTimestamp()

        let update = new EmbedBuilder()
            .setTitle(`Nodefy update!`)
            .setURL("https://discord.gg/Tb7K7TqF7y")
            .setDescription("update description")

        await interaction.reply({
            embeds: [embed1, update],
            components: [buttons]
        })
    }
}
