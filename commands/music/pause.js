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

  try {
    await Client.distube.pause(message);
    message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setTimestamp()
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`⏸️ | Paused By: ${member.user}`)]
    })
  } catch {
    return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTimestamp()
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`${ee.error} Current track is already paused.`)]
    })
  }
}


module.exports.help = {
  name: "pause",
  aliases: ['pause'],
  usage: "pause",
  description: "Pause a track",
  inVoiceChannel: true,
  sameVoiceChannel: true,
  botSendPerms: ['SEND_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  botEmbedPerms: ['EMBED_LINKS']
}