const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");

module.exports.run = async (Client, message, args, text, prefix) => {
  try {
    const member = message.mentions.members.first() || message.member
    const { channel } = message.member.voice
    const queue = Client.distube.getQueue(message)

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


    if (!args[0])
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`\`❌ ERROR | You didn't put a number\``)
          .setDescription(`\`Current Volume: ${queue.volume}% \nUsage: ${prefix}volume <0-100>\``)]
      })

    if (!(0 <= Number(args[0]) && Number(args[0]) <= 100))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`\`❌ ERROR | Volume out of Range\``)
          .setDescription(`\`Usage: ${prefix}volume <0-100>\``)]
      })

    Client.distube.setVolume(message, Number(args[0]))
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`\`🔊 | Changed the Volume to: ${args[0]}%\``)]
    })

  } catch (e) {
    console.log(`❌ | Error: \`${e}\``)
  }
}

module.exports.help = {
  name: "volume",
  aliases: ['vol', 'volume'],
  usage: "volume <0-100>",
  description: "Changes The Music Volume of a Bot",
  inVoiceChannel: true,
  sameVoiceChannel: true,
  botSendPerms: ['SEND_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  botEmbedPerms: ['EMBED_LINKS']
}