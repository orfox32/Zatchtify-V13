const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");

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

    if (message.member.voice.selfDeaf) return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`\`❌ | You cannot run this command while deafened\``)]
    });

    const queue = Client.distube.getQueue(message.guild.id);
    const song = queue.songs[0]

    if (!args[0]) return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`\`❌ ERROR | To seek you must need to provide a time in seconds.\``)
        .setDescription(`type: \`${prefix}seek <time in seconds>\``)]
    })

    const time = Number(args[0])

    if (isNaN(time))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`\`❌ ERROR | Time value must be an integer.\``)
          .setDescription(`type: \`${prefix}seek <number in seconds>\``)]
      })

      if (time > queue.songs[0].duration || time < 0)
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`❌ ERROR | The seek position must be between \`0\` and \`${queue.songs[0].duration} seconds long!\``)]
      })
      
    queue.seek(time)

    message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`\`✅ | Forward the song to ${time} seconds\``)]
    })

  } catch (e) {
    console.log(`❌ | Error: \`${e}\``)
  }
}

module.exports.help = {
  name: "seek",
  aliases: ['seek', 'forward'],
  inVoiceChannel: true,
  sameVoiceChannel: true,
  botSendPerms: ['SEND_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  botEmbedPerms: ['EMBED_LINKS']
}