const { SlashCommandBuilder, EmbedBuilder, Webhook, WebhookClient, PermissionFlagsBits} = require("discord.js");
const { i } = require("mathjs");
const {webhookid, webhooktoken} = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("re")
    .setDescription("ksajklasj")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),


    async execute(interaction) {
        const { options}  = interaction;
        const channel = options.getChannel("channel")

        const webhookClient = new WebhookClient({
            id: webhookid,
            token: webhooktoken
        })

        let embed1 = new EmbedBuilder()
        .setTitle("1 - Mantenere un comportamento adeguato\n ▬▬▬▬▬▬▬▬▬▬▬")
        .setDescription("「1.1」Tratta gli utenti in modo rispettoso, sono vietate discriminazioni, odio, insulti, razzismo e molestie.\n 「1.2」Non sono tollerati comportamenti eccessivamente fastidiosi, come troll, drama, flame, eccetera.\n「1.3」Evitare di utilizzare un linguaggio eccessivamente volgare, sono vietate in particolar modo le bestemmie, è consentito invece l'utilizzo delle parolacce ma solo se inserite in un contesto.")

        let embed2 = new EmbedBuilder()
        .setTitle("2- Argomenti Sensibili\n ▬▬▬▬▬▬▬▬▬▬▬")
        .setDescription("「2.1」Ciò che non ha a che fare con la community (quindi problemi personali con altri utenti) devono rimanere fuori dal server. E' oltremodo vietato condividere informazioni personali o immagini di altri membri senza il loro consenso.\n「2.2」Qualsiasi contenuto NSFW (Not Safe For Work) è vietato sul server. E' anche preferibile evitare il blackhumor in qualsiasi forma.\n 「2.3」Non è consentito streammare piattaforme come Omeagle, Netflix, Amazon Prime Video, Meet o le chat private con gli utenti. E' oltretutto vietato condividere le chat private con altri utenti ,su questa o altre piattaforme, o informazioni personali come password, numero di telefono, eccetera.")

        let embed3 = new EmbedBuilder()
        .setTitle("3 - Evitare comportamenti fastidiosi\n ▬▬▬▬▬▬▬▬▬▬▬")
        .setDescription("「3.1」Sono vietati spam, massping, flood, wall of text, abuso della funzionalità censura, spoiler e qualsiasi cosa possa intasare e/o arrecare fastidio alle testuali.\n「3.2」Rispettate il topic del canale.\n 「3.3」È vietato pingare senza motivo lo staff, streamer/youtuber, amicozzi o utenti senza una buona motivazione.\n 「3.4」Non è consentito inviare link o file che facciano crashare Discord.")

        let embed4 = new EmbedBuilder()
        .setTitle("4- Canali Vocali\n ▬▬▬▬▬▬▬▬▬▬▬")
        .setDescription("「4.1」E' vietato usare clownfish o soundboard earrape in pubblica.\n「4.2」E' vietato fare earrape con il proprio microfono.\n 「4.3」E' vietato utilizzare i bot della musica per mettere earrape, canzoni o video che vanno contro al regolamento del server.")

        let embed5 = new EmbedBuilder()
        .setTitle("5 - Regole generali\n  ▬▬▬▬▬▬▬▬▬▬▬")
        .setDescription("「5.1」Non è consentito trattare l'argomento età, tantomeno chiedere tale informazione agli utenti in pubblica.\n 「5.2」Non è consentito avere un nickname offensivo o non taggabile, è vietata l'impersonificazione di personaggi famosi, storici o politici. Sono vietate pfp contenente NSFW o politici.\n 「5.3」In caso di infrazione delle regole da parte di uno o più utenti, chiamare il prima possibile uno staffer cercando di intervenire il meno possibile. Non sono vietati consigli, indicazioni o avvisi.\n 「5.4」E' assolutamente vietato il self-promoting in DM di massa.")

        let embed6 = new EmbedBuilder()
        .setTitle("6- Warn e Ban\n ▬▬▬▬▬▬▬▬▬▬▬")
        .setDescription('「6.1」In caso di infrazione delle regole da parte di uno o più utenti e in base alla situazione verranno dati Warn o in casi peggiori dei Ban\n 「6.2」In base al numero dei Warn ottenuti ci saranno "punizioni" differenti:\n --------- 1° Warn ( Muto in vocale)\n--------- 2° Warn ( Time out per una settimana)\n--------- 3° Warn (Ban)\n「6.3」Ogni Warn durerà una settimana tranne particolari eccezioni\n 「6.4」Per segnalare un Warn ingiusto e/o contestare di un abuso di potere o comunque comportamenti scorretti da parte dello staff, è imperativo rivolgersi direttamente ad un admin ed evitare assolutamente di parlarne in pubblica.')

        let embed7 = new EmbedBuilder()
        .setTitle("7- Rispetto per i ToS\n ▬▬▬▬▬▬▬▬▬▬▬")
        .setDescription("In quanto community ci impegnamo a rispettare le condizioni e i termini di servizio di discord.\nLe linee guida della community: https://discordapp.com/guidelines \nI termini di servizio: https://discordapp.com/terms \nLe linee guida per i server discord:\n https://support.discordapp.com/hc/it/articles/360035969312 \nLe regole nei limiti d'età:\n https://support.discord.com/hc/it/articles/360040724612-Why-is-Discord-asking-for-my-birthday- \n`-Lo staff`")

        let disclaimer = new EmbedBuilder()
        .setColor("White")
        .setDescription("**Disclaimer: :warning: SE UNA COSA NON È NEL REGOLAMENTO, NON SIGNIFICA CHE NON POSSA ESSERE VIETATA, usate il buon senso :warning: Per qualsiasi dubbio sul regolamento vi invitiamo a scrivere allo staff")

        webhookClient.send({
            embeds: [embed1, embed2, embed3, embed4, embed5, embed6, embed7,disclaimer],
        })
    }
}