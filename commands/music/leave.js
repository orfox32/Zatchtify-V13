const { getVoiceConnection } = require('@discordjs/voice');
const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");

module.exports.run = async (Client, message, args, text, prefix) => {
  
    const member = message.mentions.members.first() || message.member
    const { channel } = message.member.voice

    if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT"))
    return message.channel.send({embeds: [new MessageEmbed()
    .setColor(ee.wrongcolor)
    .setFooter(ee.footertext, ee.footericon)
    .setDescription(`${ee.error} I am not allowed to \`join\` your Channel, i need \`CONNECT\` permissions`)]})

    if (!message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK"))
    return message.channel.send({embeds: [new MessageEmbed()
    .setColor(ee.wrongcolor)
    .setFooter(ee.footertext, ee.footericon)
    .setDescription(`${ee.error} I am not allowed to \`speak\` to your Channel, i need \`SPEAK\` permissions`)]})

     if (!message.guild.me.permissionsIn(message.member.voice.channel).has("VIEW_CHANNEL"))
    return message.channel.send({embeds: [new MessageEmbed()
    .setColor(ee.wrongcolor)
    .setFooter(ee.footertext, ee.footericon)
    .setDescription(`${ee.error} I am not allowed to \`view\` your Channel, i need \`VIEW_CHANNEL\` permissions`)]})


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

    try {
      const embed = new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon);

  const queue = message.client.distube.getQueue(message);
  
  if (queue) {
      message.client.distube.stop(message);
      message.client.distube.voices.leave(message.guild);

      embed.setDescription(`✅ | Successfully **Leave** the voice channel.`);
message.channel.send({ embeds: [embed] });
  } else {
      message.client.distube.voices.leave(message.guild);

      embed.setDescription(`✅ | Successfully **Leave** the voice channel.`);
message.channel.send({ embeds: [embed] });
  }
  } catch {
    return message.channel.send({embeds: [new MessageEmbed().setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon).setDescription(`\`I'm not connected to the voice channel yet.\``)]});
  }
}

module.exports.help = {
    name: "leave",
    aliases: ['leave', 'left'],
    usage: "leave",
    description: "Leave your voice channel",
    inVoiceChannel: true,
    sameVoiceChannel: true,
    botSendPerms: ['SEND_MESSAGES'],
    botPerms: ['MANAGE_MESSAGES'],
    botEmbedPerms: ['EMBED_LINKS']
  }