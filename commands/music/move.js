const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");
require('array.prototype.move')

module.exports.run = async (Client, message, args, text, prefix) => {
  try {
    const member = message.mentions.members.first() || message.member
    const { channel } = message.member.voice

    if (!Client.distube.getQueue(message))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL({ dynamic: true }))
          .setTitle(`\`❌ ERROR | I am not playing Something\``)
          .setDescription(`\`The Queue is empty\``)]
      }).then(msg => {
        setTimeout(() => msg.delete(), 20000)
      })
        .catch(e => {
          console.log(e)
        })

    const queue = Client.distube.getQueue(message.guild.id);

    if (message.member.voice.selfDeaf) return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`\`❌ | You cannot run this command while deafened\``)]
    });

    let songPosition = Number(args[0])

    if (!args[0]) return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(`\`❌ ERROR | Please Specify The Number you want to move!\``)
        .setDescription(`type: \`${prefix}move <Queue Number>\``)
      ]
    });
    if (isNaN(songPosition)) return message.channel.send({
      embeds: [new MessageEmbed()
        .setFooter(ee.footertext, ee.footericon)
        .setColor(ee.wrongcolor)
        .setTitle(`\`❌ ERROR | Please Specify The Number you want to move!\``)
        .setDescription(`type: \`${prefix}move <Queue Number>\``)
      ]
    });

    if (songPosition > queue.songs.length || songPosition < 0)
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`\`❌ ERROR | This Song does not exist!\``)
          .setDescription(`**The last Song in the Queue has the Index: \`${queue.songs.length}\`**`)]
      })

    let songMoved = queue.songs[args[0] - 1];

    queue.songs.move(args[0] - 1, 1);
    message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setFooter(`💢 Action by: ${member.user.tag}`, member.user.displayAvatarURL({dynamic: true}))
        .setTitle(`✅ | Moved \`${songMoved.name}\``)
        .setTimestamp()]
    })

  } catch (e) {
    console.log(`❌ | Error: \`${e}\``)
  }
}

module.exports.help = {
  name: "move",
  aliases: ['move'],
  usage: `move <Queue Number>`,
  description: `moves a Song from the Queue`,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  botSendPerms: ['SEND_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  botEmbedPerms: ['EMBED_LINKS']
}