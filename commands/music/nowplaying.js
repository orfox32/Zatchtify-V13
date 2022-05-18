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

    
    const msg = await message.channel.send('Processing.....');
    const queue = Client.distube.getQueue(message);
    const uni = `${queue.songs[0].playing ? '⏸️ |' : '▶️ |'}`;
    const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);

    const embed = new MessageEmbed()
      .setAuthor(queue.songs[0].playing ? 'Song Pause⏸️' : 'Now Playing🎶')
      .setColor(ee.color)
      .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
      .setThumbnail(`${queue.songs[0].thumbnail}`)
      .addField('Requester:', `${queue.songs[0].user}`, true)
      .addField('Volume:', `\`${queue.volume}%\``, true)
      .addField(`Current Duration: \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, `\`\`\`${uni} ${'─'.repeat(part) + '🟢' + '─'.repeat(30 - part)}\`\`\``)
      .setTimestamp()

    msg.edit({ content: ' ', embeds: [embed] });


  } catch (e) {
    console.log(`❌ | Error: \`${e}\``)
  }
}


module.exports.help = {
  name: "nowplaying",
  aliases: ['np', 'nowplaying'],
  usage: "nowplaying",
  description: "Shows current Track information",
  inVoiceChannel: false,
  sameVoiceChannel: false,
  botSendPerms: ['SEND_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  botEmbedPerms: ['EMBED_LINKS']
}