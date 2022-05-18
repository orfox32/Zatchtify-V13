const Client = require('../index').Client
const config = require('../settings/config')
const { MessageEmbed } = require('discord.js')
const ee = require("../settings/embed.json");
const Schema = require('../Models/GuildConfig')
const { Permissions } = require('discord.js')

Client.on('messageCreate', async message => {

  if (message.author.bot || message.channel.type == 'DM') return

  if (!message.guild) return;

  const guildConfig = await Schema.findOne({ 
    GuildID: message.guildId
  })

  let prefix = config.prefix

  if(guildConfig && guildConfig?.Prefix){
    prefix = guildConfig?.Prefix
  }

  const mention = new RegExp(`^<@!?${Client.user.id}>( |)$`);
    if (message.content.match(mention)) {
      const embed = new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`**My prefix is: \`${prefix}\`**`);
      message.channel.send({ embeds: [embed] })
    };

  if (!message.content.startsWith(prefix)) return

  /*if (!message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS"))
        return message.reply("**:x: I need `EMBED_LINKS` Permission**")
  
  if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES"))
        return message.author.send("**:x: I need `SEND_MESSAGES` Permission**")*/

  let args = message.content.slice(prefix.length).trim().split(/ +/g)
  let cmd = args.shift().toLowerCase()
  if (cmd.length === 0) return

  let commands = Client.commands.get(cmd)
  if (!commands) commands = Client.commands.get(Client.aliases.get(cmd))

  if(!message.guild.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;

  if (commands) {
    if (commands.help.ownerOnly) {
      if (!Client.config.OWNERID.includes(message.author.id)) {
        return message.channel.send({
          embeds: [new MessageEmbed()
            .setTimestamp()
            .setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL())
            .setColor(ee.wrongcolor)
            .setDescription(`${message.member} \`You can't use Owner Commands\``)]
        }).then(msg => {
          setTimeout(() => msg.delete(), 5000)
        })
          .catch(e => {
            console.log(e)
          })
      }
    }

    if (!message.member.permissions.has(commands.help.userPerms || []))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setTimestamp()
          .setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL())
          .setColor(ee.wrongcolor)
          .setDescription(`You don't have \`${commands.help.userPerms || []}\` Permissions`)]
      })

    if (!message.guild.me.permissions.has(commands.help.botPerms || []))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setTimestamp()
          .setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL())
          .setColor(ee.wrongcolor)
          .setDescription(`I don't have \`${commands.help.botPerms || []}\` Permissions`)]
      })

    if (!message.guild.me.permissionsIn(message.channel).has(commands.help.botEmbedPerms || []))
      return message.author.send({embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTimestamp()
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`\`${ee.error} I am missing ${commands.help.botEmbedPerms || []} Permission\``)
      ]})

    if (!message.guild.me.permissionsIn(message.channel).has(commands.help.botSendPerms || []))
      return message.author.send({embeds: [new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setTimestamp()
      .setFooter(ee.footertext, ee.footericon)
      .setDescription(`\`${ee.error} I am missing the Permission to ${commands.help.botSendPerms || []}\``)
      ]})


    const embed = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)

    if (commands.help.sameVoiceChannel) {
      if (message.guild.me.voice.channel) {
        if (message.guild.me.voice.channelId !== message.member.voice.channelId) {
          embed.setDescription(`You must be in the same channel as ${message.client.user}!`);
          return message.channel.send({ embeds: [embed] });
        }
      }
    }
    
    if (commands.help.inVoiceChannel && !message.member.voice.channel)
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setTimestamp()
          .setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL())
          .setColor(ee.wrongcolor)
          .setDescription(`\`${ee.error} You must be in a voice channel!\``)]
      }).then(msg => {
        setTimeout(() => msg.delete(), 15000)
      })
        .catch(e => {
          console.log(e)
        })
  }

  if (commands) {

    commands.run(Client, message, args, args.join(" "), prefix)
  } else {
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTimestamp()
        .setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`❌ Unknown command, try: ${prefix}help\``)]
    })
  }
})

