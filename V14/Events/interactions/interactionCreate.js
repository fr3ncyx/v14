const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    const { customId, values, guild, member } = interaction; // you need to destructure values from interaction first to use it below
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        return interaction.reply({ content: "outdated command" });
      }
      command.execute(interaction, client);
    } else if (interaction.isButton()) {

      if (customId == "sium") {
        const role = interaction.guild.roles.cache.get("1057417834419990648");
        return interaction.member.roles.add(role).then((member) =>
          interaction.reply({
            content: `${role} has been assigned to you.`,
            ephemeral: true,
          })
        );
      }
    } else if (interaction.isSelectMenu()) {
      if (customId == 'reaction-roles') {
        if (interaction.values.length <= 0) {
          interaction.component.data.options.forEach(option => {
            if (interaction.member.roles.cache.has(option.value)) {
              interaction.member.roles.remove(option.value)
            }
          })
        } else {
          interaction.values.forEach(id => {
            if (!interaction.member.roles.cache.has(id)) interaction.member.roles.add(id)
          })
        }

        interaction.reply({ content: "Ruoli aggiornati.", ephemeral: true });
      }
    } else {
      return;
    }
  },
};
