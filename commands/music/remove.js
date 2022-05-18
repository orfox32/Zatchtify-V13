const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");

module.exports.run = async (Client, message, args, text, prefix) => {

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

  if (message.member.voice.selfDeaf) return message.channel.send({
    embeds: [new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setDescription(`\`❌ | You cannot run this command while deafened\``)]
  });

  const queue = Client.distube.getQueue(message.guild.id);
  if (!args.length) return message.channel.send({
    embeds: [new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`\`❌ ERROR | Please add the Track you want to remove!\``)
      .setDescription(`type: \`${prefix}remove <Number>\``)]
  })

  if (isNaN(args[0]))
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`\`❌ ERROR | It has to be a valid Queue Number!\``)
        .setDescription(`type: \`${prefix}remove <Number>\``)]
    })

  if (args[0] > queue.songs.length)
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`\`❌ ERROR | The queue is only ${queue.songs.length} songs long!\``)]
    })


  try {
    const song = queue.songs.splice(args[0] - 1, 1);
    message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`✅ **|** Removed: **\`${song[0].name}\`** from the queue.`)
        .setTimestamp()
      ]
    })
  } catch (e) {
    console.log(`❌ | Error: \`${e}\``)
  }
}

module.exports.help = {
  name: "remove",
  aliases: ['remove', 'r'],
  usage: `remove <Queue Number>`,
  description: `Removes a Song from the Queue`,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  botSendPerms: ['SEND_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  botEmbedPerms: ['EMBED_LINKS']
}