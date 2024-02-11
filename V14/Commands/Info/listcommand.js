const {
    ComponentType,
    EmbedBuilder,
    SlashCommandBuilder,
    ActionRowBuilder,
    SelectMenuBuilder,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("commandlist")
      .setDescription("Ottieni una lista dei comandi del bot di discord."),
    async execute(interaction) {
      const emojis = {
        info: "📝",
        moderation: "🛠️",
        general: "⚙️",
        ticket: "🎟️"
      };
  
      const directories = [
        ...new Set(interaction.client.commands.map((cmd) => cmd.folder)),
      ];
  
      const formatString = (str) =>
        `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
  
      const categories = directories.map((dir) => {
        const getCommands = interaction.client.commands
          .filter((cmd) => cmd.folder === dir)
          .map((cmd) => {
            return {
              name: cmd.data.name,
              description:
                cmd.data.description ||
                "Non c'è nessuna descrizione per questo comando.",
            };
          });
  
        return {
          directory: formatString(dir),
          commands: getCommands,
        };
      });
  
      const embed = new EmbedBuilder().setDescription(
        "Per favore scegli una categoria nel menù qui sotto"
      );
  
      const components = (state) => [
        new ActionRowBuilder().addComponents(
          new SelectMenuBuilder()
            .setCustomId("help-menu")
            .setPlaceholder("Seleziona una categoria")
            .setDisabled(state)
            .addOptions(
              categories.map((cmd) => {
                return {
                  label: cmd.directory,
                  value: cmd.directory.toLowerCase(),
                  description: `Comandi dalla ${cmd.directory} categoria.`,
                  emoji: emojis[cmd.directory.toLowerCase() || null],
                };
              })
            )
        ),
      ];
  
      const initialMessage = await interaction.reply({
        embeds: [embed],
        components: components(false),
        ephemeral: true
      });
  
      const filter = (interaction) =>
        interaction.user.id === interaction.member.id;
  
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        componentType: ComponentType.SelectMenu,
      });
  
      collector.on("collect", (interaction) => {
        const [directory] = interaction.values;
        const category = categories.find(
          (x) => x.directory.toLowerCase() === directory
        );
  
        const categoryEmbed = new EmbedBuilder()
          .setTitle(`${formatString(directory)} commands`)
          .setDescription(
            `Tutti i comandi della lista: ${directory}`
          )
          .addFields(
            category.commands.map((cmd) => {
              return {
                name: `\`${cmd.name}\``,
                value: cmd.description,
                inline: true,
              };
            })
          );
  
        interaction.update({ embeds: [categoryEmbed], ephemeral: true });
      });
  
      collector.on("end", () => {
        initialMessage.edit({ components: components(true)});
      });
    },
  };
