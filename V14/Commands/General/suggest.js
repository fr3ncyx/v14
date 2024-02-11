const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggest")
        .setDescription("Suggerisci qualcosa")
        .addStringOption(option =>
            option.setName("name")
                .setDescription("Nome del tuo suggerimento")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Descrivi il tuo suggerimento")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Indica il canale dove mandare il suggerimento")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),

    async execute(interaction) {
        const { options, member } = interaction;

        const name = options.getString("name");
        const description = options.getString("description");
        const channel = options.getChannel("channel")

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`Un suggerimento proposto da: ${member}`)
            .addFields(
                { name: "Suggerimento", value: `${name}` },
                { name: "Descrizione", value: `${description}` },
            )
            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) });

        try {
            const s = await channel.send({ embeds: [embed] });
            await s.react("👍");
            await s.react("👎");
            await interaction.reply({ content: "Il suggerimento è stato mandato e creato con successo", ephemeral: true });
        } catch (err) {
            console.log(err)
        }
    }
}