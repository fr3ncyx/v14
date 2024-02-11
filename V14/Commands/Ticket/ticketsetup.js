const { Client, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ChannelType } = require("discord.js");
const TicketSetup = require("../../Models/TicketSetup")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticketsetup")
        .setDescription("Crea un ticket")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Seleziona il canale dove i ticket devono essere creati.")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        )
        .addChannelOption(option =>
            option.setName("category")
                .setDescription("Seleziona la categoria dove i ticket devono essere creati.")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildCategory)
        )
        .addChannelOption(option =>
            option.setName("transcripts")
                .setDescription("Seleziona la categoria dove i transcripts devono essere inviati.")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        )
        .addRoleOption(option =>
            option.setName("handlers")
                .setDescription("Select the ticket handlers role")
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName("everyone")
                .setDescription("Tagga il ruolo everyone")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Imposta la descrizione per l'embed.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("firstbutton")
                .setDescription("Format: (Name of button, Emoji")
                .setRequired(true)
        ).addStringOption(option =>
            option.setName("secondbutton")
                .setDescription("Format: (Name of button, Emoji")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("thirdbutton")
                .setDescription("Format: (Name of button, Emoji")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("fourthbutton")
                .setDescription("Format: (Name of button, Emoji")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { guild, options } = interaction;

        try {
            const channel = options.getChannel("channel");
            const category = options.getChannel("category");
            const transcripts = options.getChannel("transcripts");

            const handlers = options.getRole("handlers");
            const everyone = options.getRole("everyone");

            const description = options.getString("description");
            const firstbutton = options.getString("firstbutton").split(",");
            const secondbutton = options.getString("secondbutton").split(",");
            const thirdbutton = options.getString("thirdbutton").split(",");
            const fourthbutton = options.getString("fourthbutton").split(",");

            const emoji1 = firstbutton[1];
            const emoji2 = secondbutton[1];
            const emoji3 = thirdbutton[1];
            const emoji4 = fourthbutton[1];

            await TicketSetup.findOneAndUpdate(
                { GuildID: guild.id },
                {
                    Channel: channel.id,
                    Category: category.id,
                    Transcripts: transcripts.id,
                    Handlers: handlers.id,
                    Everyone: everyone.id,
                    Description: description,
                    Buttons: [firstbutton[0], secondbutton[0], thirdbutton[0], fourthbutton[0]]
                },
                {
                    new: true,
                    upsert: true
                }
            );

            const button = new ActionRowBuilder().setComponents(
                new ButtonBuilder().setCustomId(firstbutton[0]).setLabel(firstbutton[0]).setStyle(ButtonStyle.Danger).setEmoji(emoji1),
                new ButtonBuilder().setCustomId(secondbutton[0]).setLabel(secondbutton[0]).setStyle(ButtonStyle.Secondary).setEmoji(emoji2),
                new ButtonBuilder().setCustomId(thirdbutton[0]).setLabel(thirdbutton[0]).setStyle(ButtonStyle.Primary).setEmoji(emoji3),
                new ButtonBuilder().setCustomId(fourthbutton[0]).setLabel(fourthbutton[0]).setStyle(ButtonStyle.Success).setEmoji(emoji4),
            );

            const embed = new EmbedBuilder()
                .setDescription(description)

            await guild.channels.cache.get(channel.id).send({
                embeds: ([embed]),
                components: [
                    button
                ]
            });

            interaction.reply({ content: "Ticket message has been sent", ephemeral: true });
        } catch (err) {
            console.log(err);
            const errEmbed = new EmbedBuilder()
                .setColor("Red")
                .setDescription("Qualcosa è andato storto...")

            return interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
    }
}