const {
    EmbedBuilder,
    SlashCommandBuilder,
    PermissionFlagsBits,
} = require("discord.js");
const warningSchema = require("../../Models/Warning");
const { QuickDB } = require("quick.db");
const { db } = require("../../Models/Warning");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warnings")
        .setDescription("Sistema completo di warning")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addSubcommand((subcommand) =>
            subcommand
                .setName("add")
                .setDescription("Aggiungi un avvertimento ad un utente")
                .addUserOption((option) =>
                    option
                        .setName("target")
                        .setDescription("seleziona un utente")
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName("motivo")
                        .setDescription("Fornisci un motivo")
                        .setRequired(false)
                )
                .addStringOption((option) =>
                    option
                        .setName("prova")
                        .setDescription("Fornisci una prova")
                        .setRequired(false)
                )
                .addRoleOption(option => 
                    option.setName("ruolo")
                    .setDescription("Indica il ruolo warn da aggiungere all'utente")
                    .setRequired(false)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("check")
                .setDescription("Controlla gli avvertimenti di un utente")
                .addUserOption((option) =>
                    option
                        .setName("target")
                        .setDescription("seleziona un utente")
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("remove")
                .setDescription("Rimuovi uno specifico avvertimento da un utente")
                .addUserOption((option) =>
                    option
                        .setName("target")
                        .setDescription("seleziona un utente")
                        .setRequired(true)
                )
                .addRoleOption((option) => 
                    option.setName("ruolo")
                    .setDescription("Indica il ruolo warn da togliere da un utente")
                    .setRequired(false)
                )
                .addIntegerOption((option) =>
                    option
                        .setName("id")
                        .setDescription("Fornisci l'id dell'avvertimento +1 (es ID: 1) devi mettere nell'opzione id 0")
                        .setRequired(false)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("clear")
                .setDescription("Elimina tutti gli avvertimenti da un utente")
                .addUserOption((option) =>
                    option
                        .setName("target")
                        .setDescription("seleziona un utente")
                        .setRequired(true)
                )
        ),

    async execute(interaction) {
        const { user, options, guildId, member } = interaction;

        const sub = options.getSubcommand(["add", "check", "remove", "clear"]);
        const target = options.getUser("target");
        const reason = options.getString("motivo") || "nessuna motivazione fornita";
        const evidence = options.getString("prova") || "nessuna prova fornita";
        const warnId = options.getInteger("id");
        const warnDate = new Date(
            interaction.createdTimestamp
        ).toLocaleDateString();

        const userTag = `${target.username}#${target.discriminator}`;

        const embed = new EmbedBuilder();

        if (interaction.options.getSubcommand() === "add") {
            try {
                const roleId = options.getRole("ruolo")
                const member = options.getMember("target")

                await member.roles.add(roleId)
            } catch (err) {
                console.log(err)
            }
         }

         if (interaction.options.getSubcommand() === "remove") {
            try {
                const roleId = options.getRole("ruolo")
                const member = options.getMember("target")

                await member.roles.remove(roleId)
            } catch (err) {
                console.log(err)
            }
         }



        switch (sub) {
            case "add":
                warningSchema.findOne(
                    { GuildID: guildId, UserID: target.id, UserTag: userTag },
                    async (err, data) => {
                        if (err) throw err;

                        if (!data) {
                            data = new warningSchema({
                                GuildID: guildId,
                                UserID: target.id,
                                UserTag: userTag,
                                Content: [
                                    {
                                        ExecuterId: user.id,
                                        ExecuterTag: user.tag,
                                        Reason: reason,
                                        Evidence: evidence,
                                        Date: warnDate,
                                    },
                                ],
                            });
                        } else {
                            const warnContent = {
                                ExecuterId: user.id,
                                ExecuterTag: user.tag,
                                Reason: reason,
                                Evidence: evidence,
                                Date: warnDate,
                            };
                            data.Content.push(warnContent);
                        }
                        data.save();
                    }
                );

                embed
                    .setColor("Green")
                    .setDescription(
                        `
                Avvertimento aggiunto: ${userTag} | ||${target.id}||
                **Motivo**: ${reason}
                **Prova**: ${evidence}
                `
                    )
                    .setFooter({
                        text: member.user.tag,
                        iconURL: member.displayAvatarURL({ dynamic: true }),
                    })
                    .setTimestamp();
        
                interaction.reply({ embeds: [embed] });
                

                break;
            case "check":
                warningSchema.findOne(
                    { GuildID: guildId, UserID: target.id, UserTag: userTag },
                    async (err, data) => {
                        if (err) throw err;

                        if (data) {
                            embed
                                .setColor("Green")
                                .setDescription(
                                    `${data.Content.map(
                                        (w, i) =>
                                            `**ID**: ${i + 1}
                        **By**. ${w.ExecuterTag}
                        **Date**: ${w.Date}
                        **Motivo**: ${w.Reason}
                        **Prova**: ${w.Evidence}\n\n
                        `
                                    ).join(" ")}`
                                )
                                .setFooter({
                                    text: member.user.tag,
                                    iconURL: member.displayAvatarURL({ dynamic: true }),
                                })
                                .setTimestamp();

                            interaction.reply({ embeds: [embed] });
                        } else {
                            embed.setColor("Red")
                                .setDescription(`${user.tag} | ||${target.id}|| non ha avvertimenti `)
                                .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                                .setTimestamp();
                            interaction.reply({embeds: [embed]});
                        }
                    }
                );

                break;
            case "remove":
                warningSchema.findOne(
                    { GuildID: guildId, UserID: target.id, UserTag: userTag },
                    async (err, data) => {
                        if (err) throw err;

                        if (data) {
                            data.Content.splice(warnId, 1);
                            data.save();

                            embed.setColor("Green")
                                .setDescription(`${user.tag}'s warning **ID**: ${warnId + 1} è stato rimosso`)
                                .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                                .setTimestamp();

                            interaction.reply({ embeds: [embed] });
                        } else {
                            embed.setColor("Red")
                                .setDescription(`${user.tag} | ||${target.id}|| non ha avvertimenti `)
                                .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                                .setTimestamp();
                            interaction.reply({embeds: [embed]});
                        }
                    }
                );
                break;

            case "clear":
                warningSchema.findOne(
                    { GuildID: guildId, UserID: target.id, UserTag: userTag },
                    async (err, data) => {
                        if (err) throw err;

                        if (data) {
                            await warningSchema.findOneAndDelete({ GuildID: guildId, UserID: target.id, UserTag: userTag});

                            embed.setColor("Green")
                                .setDescription(`${user.tag}'s warning sono stati rimossi | ||${target.id}||`)
                                .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                                .setTimestamp();

                            interaction.reply({ embeds: [embed] });
                        } else {
                            embed.setColor("Red")
                                .setDescription(`${user.tag} | ||${target.id}|| non ha avvertimenti `)
                                .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                                .setTimestamp();
                            interaction.reply({embeds: [embed]});
                        }
                    }
                );
                break;
        }
    },
};
