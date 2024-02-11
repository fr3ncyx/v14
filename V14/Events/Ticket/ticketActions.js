const { ButtonInteraction, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const TicketSetup = require("../../Models/TicketSetup");
const ticketSchema = require("../../Models/Ticket");

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        const { guild, member, customId, channel } = interaction;
        const { ManageChannels, SendMessages } = PermissionFlagsBits;

        if (!interaction.isButton()) return;

        if (!["close", "lock", "unlock", "claim"].includes(customId)) return;

        const docs = await TicketSetup.findOne({ GuildID: guild.id });

        if (!docs) return;

        if (!guild.members.me.permissions.has((r) => r.id === docs.Handlers))
            return interaction.reply({ content: "Non ho il permesso di eseguire questa azione", ephemeral: true });

        const embed = new EmbedBuilder().setColor("Aqua");

        ticketSchema.findOne({ ChannelID: channel.id }, async (err, data) => {
            if (err) throw err;
            if (!data) return;

            const fetchedMember = await guild.members.cache.get(data.MembersID);

            switch (customId) {
                case "close":
                    if (data.closed == true)
                        return interaction.reply({ content: "Il ticket è già in fase di eliminazione..", ephemeral: true });

                    const transcript = await createTranscript(channel, {
                        limit: -1,
                        returnBuffer: false,
                        fileName: `${member.user.username}-ticket${data.Type}-${data.TicketID}.html`,
                    });

                    await ticketSchema.updateOne({ ChannelID: channel.id }, { Closed: true });

                    const transcriptEmbed = new EmbedBuilder()
                        .setTitle(`Transcript Type: ${data.Type}\nId: ${data.TicketID}`)
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp();

                    const transcriptProcess = new EmbedBuilder()
                        .setTitle('Sto salvando il transcript...')
                        .setDescription("Il ticket sarà chiuso in 10 secondi, abilita i DM per il transcript del ticket")
                        .setColor("Red")
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp();

                    const res = await guild.channels.cache.get(docs.Transcripts).send({
                        embeds: [transcriptEmbed],
                        files: [transcript],
                    });

                    channel.send({ embeds: [transcriptProcess] });

                    setTimeout(function () {
                        member.send({
                            embeds: [transcriptEmbed.setDescription(`Accedi al tuo transcript del ticket: ${res.url}`)],
                        }).catch(() => channel.send("Posso\ non posso inviare il transcript come messaggio diretto"));
                        channel.delete();
                    }, 10000);

                    break;

                case "lock":
                    if (!member.permissions.has(ManageChannels))
                        return interaction.reply({ content: "Non hai il permesso per eseguire questa azione", ephemeral: true });

                    if (data.Locked == true)
                        return interaction.reply({ content: "Il ticket è stato bloccato.", ephemeral: true });

                    await ticketSchema.updateOne({ ChannelID: channel.id }, { Locked: true });
                    embed.setDescription("Il ticket è stato bloccato con successo 🔒")

                    data.MembersID.array.forEach((m) => {
                        channel.permissionOverwrites.edit(m, { SendMessages: false });
                    });

                    return interaction.reply({ embeds: [embed] });

                case "unlock":
                    if (!member.permissions.has(ManageChannels))
                        return interaction.reply({ content: "Non hai il permesso per eseguire questa azione", ephemeral: true });

                    if (data.Locked == false)
                        return interaction.reply({ content: "Il ticket è stato sbloccato.", ephemeral: true });

                    await ticketSchema.updateOne({ ChannelID: channel.id }, { Locked: false });
                    embed.setDescription("Il ticket è stato sbloccato con successo 🔐")

                    data.MembersID.array.forEach((m) => {
                        channel.permissionOverwrites.edit(m, { SendMessages: true });
                    });

                    return interaction.reply({ embeds: [embed] });

                case "claim":
                    if (!member.permissions.has(ManageChannels))
                        return interaction.reply({ content: "Non hai il permesso per eseguire questa azione", ephemeral: true });

                    if (data.Claimed == true)
                        return interaction.reply({ content: `Il ticket è già preso in carico da <@${data.ClaimedBy}>`, ephemeral: true });
                    
                    await ticketSchema.updateOne({ ChannelID: channel.id}, { Claimed: true, ClaimedBy: member.id});

                    embed.setDescription(`Il ticket è stato preso in carico con successo da ${member}`);

                    interaction.reply({embeds: [embed]});

                    break;
            }
        });
    }
}