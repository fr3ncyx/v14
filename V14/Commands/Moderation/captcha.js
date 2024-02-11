const { AttachmentBuilder, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require('discord.js');
const { Captcha } = require('captcha-canvas');
const captchaSchema = require("../../Models/Captcha");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("captcha")
        .setDescription("create captcha system")
        .addRoleOption(option =>
            option.setName("role")
                .setDescription("role to be given to the verify")
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client, args) {
        const { options } = interaction;
        const channel = options.getChannel("channel")
        const roleId = options.getRole("role")

        const captcha = new Captcha(); //create a captcha canvas of 100x300.
        captcha.async = true //Sync
        captcha.addDecoy(); //Add decoy text on captcha canvas.
        captcha.drawTrace(); //draw trace lines on captcha canvas.
        captcha.drawCaptcha(); //draw captcha text on captcha canvas.

        const captchAttachment = new AttachmentBuilder(
            await captcha.png,
            "captcha.png"
        );

        captchaSchema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if(!data) {
                const newWelcome = await captchaSchema.create({
                    Guild: interaction.guild.id,
                    Channel: channel.id,
                    Role: roleId.id
                });
            }
            interaction.reply({content: 'Creato con successo il captcha', ephemeral: true});
        })
    }
}