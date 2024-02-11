const { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionsBitField } = require("discord.js");
const inviteSchema = require("../../Models/inviteSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite-logger")
        .setDescription("Set up the invite logger system.")
        .addSubcommand(command =>
            command.setName("setup")
                .setDescription("Set up the invite logger system.")
                .addChannelOption(option => option.setName("channel")
                    .setDescription("The channel you want to send the invite logging in.")
                    .setRequired(true)
                    .addChannelTypes(ChannelType.GuildText)
                )
        )
        .addSubcommand(command =>
            command.setName("disable")
                .setDescription("Disable the invite logger system.")
        ),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You don't have permission to manage the invite logger syste,.", ephemeral: true });

        const { options } = interaction;
        const sub = options.getSubcommand();

        const Data = await inviteSchema.findOne({ Guild: interaction.guild.id });

        switch (sub) {
            case "setup":

                const channel = options.getChannel("channel");

                if (Data) return await interaction.reply({ content: "The invite logging system is already enabled here!", ephemeral: true });
                else {
                    await inviteSchema.create({
                        Guild: interaction.guild.id,
                        Channel: channel.id
                    })

                    const embed = new EmbedBuilder()
                        .setColor("Blue")
                        .setDescription(`✅ THe invite logging system has been enabled in ${channel}`)

                    await interaction.reply({ embeds: [embed] })
                }
        }

        switch (sub) {
            case "disable":

            if (Data) return await interaction.reply({ content: "There is no logging system up there!", ephemeral: true});
            else {
                await inviteSchema.deleteMany({ Guild: interaction.guild.id});

                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription("✅ The invite logging has been disabled.")

                await interaction.reply({ embeds: [embed]})
            }
        }
    }
}