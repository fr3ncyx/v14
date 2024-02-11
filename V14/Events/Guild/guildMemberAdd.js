const { EmbedBuilder } = require("@discordjs/builders");
const { GuildMember, Embed, InteractionCollector, AttachmentBuilder } = require("discord.js");
const Schema = require("../../Models/Welcome");
const { createCanvas, loadImage, registerFont } = require("canvas")
const client = require("../../index")

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
            if (!data) return;
            let channel = data.Channel;
            let Msg = data.Msg || " ";
            let Role = data.Role;

            const { user, guild } = member;
            const welcomeChannel = member.guild.channels.cache.get(data.Channel);

            const welcomeEmbed = new EmbedBuilder()
                .setTitle("**New member!**")
                .setDescription(data.Msg)
                .setColor(0x037821)
                .addFields({ name: 'Total members', value: `sss` })//${guild.memberCount}
                .setTimestamp();

            welcomeChannel.send({ embeds: [welcomeEmbed] });
            member.roles.add(data.Role);

            let canvas = await createCanvas(1700, 600)//createCanvas(larghezza, altezza)
            let ctx = await canvas.getContext("2d")

            //caricare un immagine
            let img = await loadImage("https://i2.wp.com/www.napolimetropoli.it/sito2/wp-content/uploads/2019/10/nero-sfondo-nero-596818.jpg?fit=3264%2C2448&ssl=1")
            ctx.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.height / 2) //drawImage(immagine, posizioneX, posizioneY, Larghezza, altezza)

            //riempire di un colore
            ctx.fillStyle = "rgba(0,0,0,0.30)"
            ctx.fillRect(70, 70, canvas.width - 70 - 70, canvas.height - 70 - 70) //fillReact(posizioneX (da sinistra), posizioneY (dall'alto), larghezza, altezza)

            //Caricare un immagine rotonda
            ctx.save()
            ctx.beginPath()
            ctx.arc(150 + 300 / 2, canvas.height / 2, 150, 0 - 1, 2 + Math.PI, false) //arc(centroX, centroY, raggio, startAngle, endAngolo, sensoOrario/Antiorario)
            ctx.clip()
            img = await loadImage(member.displayAvatarURL({ format: "png" }))
            ctx.drawImage(img, 150, canvas.height / 2 - 300 / 2, 300, 300)
            ctx.restore()

            ctx.fillStyle = "#fff"
            ctx.textBaseline = "middle"

            ctx.font = "80px sans-serif"
            ctx.fillText("Benvenuto/a", 500, 200) //testo, posizioneX, posizioneY

            ctx.font = "80px sans-serif"
            ctx.fillText(member.user.username.slice(0, 25), 500, canvas.height / 2)

            ctx.font = "50px sans-serif"
            ctx.fillText(`${member.guild.memberCount}° membro`, 500, 400)

            let channeldb = client.channels.cache.get(data.Channel)

            let attachment = new AttachmentBuilder(canvas.toBuffer(), "canvas.png")

            channeldb.send({ files: [attachment] })
        })
    }
}