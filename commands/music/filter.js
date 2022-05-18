const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");
const filters = [
  "clear",
  "echo",
  "bassboost",
  "earwax",
  "8D",
  "vaporwave",
  "nightcore",
  "phaser",
  "tremolo",
  "vibrato",
  "reverse",
  "surround",
  "3d",
  "karaoke",
  "flanger",
  "gate",
  "haas",
  "mcompand"
]

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

    if (!args[0]) return message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`\`❌ ERROR | Please add a Filtertype\``)
        .setDescription(`Usage: \`${prefix}filter <Filtertype>\`\nExample: \`${prefix}filter ${filters}\``)]
    })

    const queue = Client.distube.getQueue(message)

    if (args[0] === "off" && queue.filters ?.length) queue.setFilter(false)
    else if (Object.keys(Client.distube.filters).includes(args[0])) queue.setFilter(args[0])
    else if (!filters.join(" ").toLowerCase().split(" ").includes(args[0].toLowerCase()))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`\`❌ ERROR | Not a valid Filtertype\``)
          .setDescription(`Usage: \`${prefix}filter <Filtertype>\`\nFilter types:\n> \`${filters.join("`, `")}\``.substr(0, 2048))
        ]
      });

    message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setFooter(`Type Filter off if you want to reset it to default`, ee.footericon)
        .setDescription(`\`✅ Successfully Change The Filter to: ${queue.filters.join(", ") || "Off"}\``)]
    })

  } catch (e) {
    console.log(`❌ | Error: \`${e}\``)
  }
}

module.exports.help = {
  name: "filter",
  aliases: ['filter'],
  usage: 'filter <Filter Type>',  
  description: "Change the music Filter",
  inVoiceChannel: true,
  sameVoiceChannel: true,
  botSendPerms: ['SEND_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  botEmbedPerms: ['EMBED_LINKS']
}