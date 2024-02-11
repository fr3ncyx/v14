const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    ChannelType,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("announce")
      .setDescription("Send a message to a channel!")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addBooleanOption((option) =>
        option
          .setName("embed")
          .setDescription("Toggle message embed!")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("message")
          .setDescription("Write the content that you are going to send.")
          .setRequired(true)
      )
      .addChannelOption((option) =>
        option
          .setName("channel")
          .setDescription("Send the Content to an channel.")
          .addChannelTypes(ChannelType.GuildText)
          .setRequired(false)
      ),
    async execute(interaction) {
      const Message = interaction.options
        .getString("message")
        .replaceAll("+n+", `\n`);
      const channel =
        interaction.options.getChannel("channel") || interaction.channel;
      const boolean = interaction.options.getBoolean("embed");
  
      if (boolean) {
        await channel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("Announce")
              .setDescription(`${Message}`)
              .setColor("Blurple")
              .setFooter({
                text: `Hosted by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              }),
          ],
        });
  
        interaction.reply({
          content: `The embed has been sent.`,
          ephemeral: true,
        });
      } else if (!false) {
        await channel.send({
          content: `${Message}`,
        });
  
        interaction.reply({
          content: `The content has been sent.`,
          ephemeral: true,
        });
      }
    },
  };
  