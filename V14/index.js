const {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  Partials,
  Collection,
  Events,
  ActivityType,
  PermissionsBitField
} = require("discord.js");
const YoutubePoster = require("discord-youtube");
const logs = require("discord-logs")

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

const { QuickDB } = require("quick.db");
const db = new QuickDB();

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

logs(client, {
  debug: true
})

client.ytp = new YoutubePoster(client, {
  loop_delay_in_min: 1
});
client.commands = new Collection();
client.config = require("./config.json");

client.login(client.config.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});

module.exports = client;

client.on(Events.GuildMemberAdd, async (member) => {
  const role = await db.get(`autorole_${member.guild.id}`);
  const giveRole = await member.guild.roles.cache.get(role);

  member.roles.add(giveRole);
});

client.on("ready", () => {
  client.user.setActivity("https://discord.gg/T98ZpFUwwc", { type: ActivityType.Watching });
});

process.on("unhandledRejection", (reason, p) => {
  const ChannelID = "1064251646827311185";
  console.error("Unhandled promise rejection:", reason, p);
  const Embed = new EmbedBuilder()
    .setColor("Random")
    .setTimestamp()
    .setFooter({ text: "⚠️Anti Crash system" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Unhandled Rejection/Catch:\n\n** ```" + reason + "```"
      ),
    ],
  });
});

const inviteSchema = require("./Models/inviteSchema");

const invites = new Collection();
const wait = require("timers/promises").setTimeout;

client.on("ready", async () => {
  await wait(2000);

  client.guilds.cache.forEach(async (guild) => {

    const clientMember = guild.members.cache.get(client.user.id);

    if (!clientMember.permissions.has(PermissionsBitField.Flags.ManageGuild)) return;

    const firstInvites = await guild.invites.fetch().catch(err => { console.log(err) });

    invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
  })
})

client.on(Events.GuildMemberAdd, async member => {
  
  const Data = await inviteSchema.findOne({ Guild: member.guild.id});
  if(!Data) return;

  const channelID = Data.Channel;

  const channel = await member.guild.channels.cache.get(channelID);

  const newInvites = await member.guild.invites.fetch();

  const oldInvites = invites.get(member.guild.id);

  const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));

  const inviter = await client.users.fetch(invite.inviter.id);

  inviter
  ? channel.send(`${member.user.tag} joined the server using the invite ${invite.code} from ${inviter.tag}. The invite was used ${invite.uses} times since its creation`)
  : channel.send(`${member.user.tag} joined the server but I can't find out what invites they used to do it`)
})