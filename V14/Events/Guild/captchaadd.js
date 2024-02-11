const client = require("../../index")
const { Captcha } = require('captcha-canvas');
const { AttachmentBuilder, EmbedBuilder } = require("discord.js")
const captchaSchema = require("../../Models/Captcha")

client.on("guildMemberAdd", async (member) => {
    captchaSchema.findOne({ Guild: member.guild.id}, async (err, data) => {
        if (!data) return;
        let channel = data.channel;
        let Role = data.Role
        const { user, guild } = member;

        const captcha = new Captcha(); //create a captcha canvas of 100x300.
        captcha.async = true //Sync
        captcha.addDecoy(); //Add decoy text on captcha canvas.
        captcha.drawTrace(); //draw trace lines on captcha canvas.
        captcha.drawCaptcha(); //draw captcha text on captcha canvas.
    
        const captchAttachment = new AttachmentBuilder(
            await captcha.png,
            "captcha.png"
        );
    
        const captchEmbed = new EmbedBuilder()
            .setDescription("Please complete this captcha")
            .setImage('attachment://captcha.png')
    
            const msg = await member.send({
                files: [captchAttachment],
                embeds: [captchEmbed]
            });
        
            const filter = (message) => {
                if (message.author.id !== member.id) return;
                if (message.content === captcha.text) return true;
                else member.send('wrong captcha')
            }
            try {
                const response = await msg.channel.awaitMessages({
                    filter,
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                });
        
                if (response) {
                    //quando verificato
                    member.roles.add(data.Role);
                    member.send("You have been verified");
                }
            } catch (err) {
                //quando non verificato
                console.log(err)
                await member.send('You have not verified and i have kicked you')
                member.kick('not answer captcha')
            }
    })

})