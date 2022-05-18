const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");

module.exports.run = async (Client, message, args, text, prefix) => {
  try {
    const member = message.mentions.members.first() || message.member
    const { channel } = message.member.voice
    let queue = await Client.distube.getQueue(message);

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

    message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setTimestamp()
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`🔀 | Shuffled By: ${member.user}`)]
    })
    Client.distube.shuffle(message);
  } catch {
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTimestamp()
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`${ee.error} Current track is already shuffled.`)]
    })
  }
}


module.exports.help = {
  name: "shuffle",
  aliases: ['shuf', 'random'],
  usage: "shuffle",
  description: "Shuffles a track",
  inVoiceChannel: true,
  sameVoiceChannel: true,
  botSendPerms: ['SEND_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  botEmbedPerms: ['EMBED_LINKS']
}