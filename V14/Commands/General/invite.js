const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    Client,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  
  module.exports = {
    CoolDown: true,
    data: new SlashCommandBuilder()
      .setName("invite")
      .setDescription("Invite our Bot"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
      const link = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1110517509238&scope=bot%20applications.commands`;
      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setURL(link)
          .setLabel("Invite Me")
          .setStyle(ButtonStyle.Link)
      );
      const invite = new EmbedBuilder()
        .setAuthor({ name: `${client.user.tag}` })
        .setDescription(`*Click on the button below to invite me*`)
        .setThumbnail("https://emojipedia-us.s3.amazonaws.com/source/skype/289/cyclone_1f300.png")
        .setColor("Blue");
  
      interaction.reply({
        embeds: [invite],
        components: [buttons],
        ephemeral: false,
      });
    },
  };
  