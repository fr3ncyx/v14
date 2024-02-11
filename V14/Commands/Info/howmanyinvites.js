const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inviti')
        .setDescription('Ottieni quanti inviti ha fatto un utente.')
        .addUserOption(option => option.setName('user').setDescription('utente del quale vuoi controllare il numero di inviti').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');

        let invites = await interaction.guild.invites.fetch();
        let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id);
        let invCodes = userInv.map(x => x.code).join("\n")

        let i = 0;
        userInv.forEach(inv => i += inv.uses);

        const embed = new EmbedBuilder()
            .setColor(0x2f3136)
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .setTitle("Counter degli inviti dell'user")
            .setDescription(`${user.tag} ha **${i}** inviti.`)
            .addFields({
                name: "Invites Codes", value: invCodes
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}