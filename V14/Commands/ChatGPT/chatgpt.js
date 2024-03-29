const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chatgpt")
        .setDescription("ask chatgpt a question")
        .addStringOption(option => option.setName("question").setDescription("this is going to be the question"))
        .setDMPermission(false),
    async execute(interaction) {

        await interaction.deferReply();

        const question = interaction.options.getString("question");

        try {
            const res = await openai.createCompletion({
                model: "text-davinci-003",
                max_tokens: 2048,
                temperature: 0.5,
                prompt: question
            })

            const embed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`${res.data.choices[0].text}`)

            await interaction.editReply({ embeds: [embed] })
        } catch (e) {
            return interaction.editReply({ content: `Request failed with error code: **${e.response.status}**`, ephemeral: true })
        }

    }
}