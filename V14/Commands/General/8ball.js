const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription('Asks the magic 8ball a question.')
    .addStringOption(option => option.setName('question').setDescription('*Enter your question for the 8ball.').setRequired(true)),
  timeout: 10000,

  async execute(interaction) {

    const { client, guild } = interaction;
    const question = interaction.options.getString("question");

    const choice = ["It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful."]

    const ball = Math.round((Math.random() * choice.length))

    const embed = new EmbedBuilder()

    await interaction.reply({
      embeds: [
        embed.setTitle("8ball Roll Result")
          .setDescription(`Here is the response from the magic 8ball.`)
          .setColor(0x2f3136)
          .addFields(
            { name: "\`❓\` Question", value: `${question}`, inline: true },
            { name: "\`🎱\` Result", value: `${choice[ball]}`, inline: true },
          )
          .setTimestamp()
      ]
    }).catch(err => {
      interaction.reply({ embeds: [embed.setTitle("8ball Roll Unsuccessful!").setColor("0x2f3136").setDescription(":warning: | Something went wrong. Please try again later.").setTimestamp()] })
    })
  },
}