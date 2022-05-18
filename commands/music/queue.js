const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");

module.exports.run = async (Client, message, args, text, prefix) => {
  try {
    const member = message.mentions.members.first() || message.member
    const { channel } = message.member.voice
    const icon = message.guild.iconURL()

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

    let queue = Client.distube.getQueue(message);
    let song = queue.songs[0]

    if (queue.playing) {
      let embedsc = queue.songs.map((song, index) => {
        return `\n\`${index + 1}.\` [${song.name}](${song.url}) \`[${song.formattedDuration}]\` • ${song.user}`
      })
      message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setThumbnail(icon)
          .setAuthor(`${message.guild.name} Queue`, message.guild.iconURL({ dynamic: true }))
          .setDescription(`>>> **Currently Playing**\n [${queue.songs[0].name}](${queue.songs[0].url}) \`[${queue.songs[0].formattedDuration}]\` • ${queue.songs[0].user}\n\n**Rest of queue**${embedsc.join("\n")}`.substr(0, 3000))
          .setFooter(`${queue.songs.length} Songs | ${queue.formattedDuration} • Total duration`, message.guild.iconURL({ dynamic: true }))

        ]
      })
    }

  } catch (e) {
    console.log(`❌ | Error: \`${e}\``)
  }
}


module.exports.help = {
  name: "queue",
  aliases: ['q', 'queue'],
  usage: "queue",
  description: "Shows the Current Queue",
  inVoiceChannel: false,
  sameVoiceChannel: false,
  botSendPerms: ['SEND_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  botEmbedPerms: ['EMBED_LINKS']

}