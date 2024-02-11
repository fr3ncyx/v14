const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ChannelType, ActionRowBuilder } = require("discord.js");
const suggestionSchema = require("../../Models/Suggestion");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("advancedsuggest")
        .setDescription("Give a suggestion.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("type")
                .setDescription("Select an option.")
                .setRequired(true)
                .addChoices(
                    { name: "Youtube Video", value: "Youtube" },
                    { name: "Discord", value: "Discord" },
                    { name: "Services", value: "Services" },
                    { name: "Other", value: "Other" },
                )
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Describe your suggestion clearly.")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Set the channel where send the suggestion")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),

    async execute(interaction) {
        const { options, guildId, member, user, guild } = interaction;

        const type = options.getString("type");
        const description = options.getString("description")

        const channel = options.getChannel("channel")

        const embed = new EmbedBuilder()
            .setColor("Orange")
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .addFields(
                {name: "Suggestion", value: description, inline: false},
                {name: "Type:", value: type, inline: true},
                {name: "Status:", value: "Waiting", inline: false},
            )
            .setTimestamp();

        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("suggest-accept").setLabel("✅ Accetta").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("suggest-decline").setLabel("⛔ Rifiuta").setStyle(ButtonStyle.Danger),
        );

        try {
            const m = await channel.send({embeds: [embed], components: [buttons], fetchReply: true});
            await channel.send({ content: "Usa `/suggest` nel canale dei comandi del bot per inviare il tuo suggerimento"});
            await interaction.reply({content: "Il suggerimento è stato mandato correttamente nel canale", ephemeral: true});

            await suggestionSchema.create({
                GuildID: guildId, MessageID: m.id, Details: [
                    {
                        MemberID: member.id,
                        Type: type,
                        Suggestion: description
                    }
                ]
            });
        } catch (err) {
            console.log(err)
        }
    }
}