const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");

module.exports.run = async (Client, message, args, text, prefix) => {
  
    const member = message.mentions.members.first() || message.member
    const { channel } = message.member.voice

    if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT"))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`${ee.error} I am not allowed to \`join\` your Channel, i need \`CONNECT\` permissions`)]
      })

    if (!message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK"))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`${ee.error} I am not allowed to \`speak\` to your Channel, i need \`SPEAK\` permissions`)]
      })

    if (!message.guild.me.permissionsIn(message.member.voice.channel).has("VIEW_CHANNEL"))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`${ee.error} I am not allowed to \`view\` your Channel, i need \`VIEW_CHANNEL\` permissions`)]
      })

    if (channel.userLimit != 0 && channel.full)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`\`${ee.error} Your Voice Channel is full, I can't join!\``)
        ],
      });

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
          .setTimestamp()
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`\`❌ | Please enter a song url or query to search.\``)]
      })

      if(!message.guild.me.voice.channel) {
        await message.channel.send({embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`:thumbsup: **Joined \`${message.member.voice.channel.name}\` and bound to** <#${message.channel.id}>`)
        ]})
}
      try {
    await message.channel.send({
      embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setAuthor(`Searched by: ${member.user.username}`, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`\`\`\`fix\n${text}\n\`\`\``)]
    })

    Client.distube.play(message, text)
  } catch (e) {
    console.log(`❌ | Error: \`${e}\``)
  }
}


module.exports.help = {
  name: "play",
  aliases: ['p', 'play'],
  usage: "play <URL / TITLE>",
  description: "Plays a song from Youtube, Spotify and Soundcloud",
  inVoiceChannel: true,
  sameVoiceChannel: true,
  userPerms: ['SEND_MESSAGES'],
  botSendPerms: ['SEND_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  botEmbedPerms: ['EMBED_LINKS']
}