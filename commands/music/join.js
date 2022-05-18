const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice');
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

    if(!message.guild.me.voice.channel) {
      await message.channel.send({embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`:thumbsup: **Joined \`${message.member.voice.channel.name}\` and bound to** <#${message.channel.id}>`)
      ]})
}

    try {
      const embed = new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
  
  message.client.distube.voices.join(channel)
			.then(voice => {
				embed.setDescription(`✅ | Successfully **Join** the voice channel.`);
				message.channel.send({ embeds: [embed] });
			})
			.catch(error => {
				console.error(error);
				return message.reply(`❌ | An error occurred while trying to join the voice channel.\nTry using the **Play** command!`);
			});
   
  } catch (e) {
    console.log(`❌ | Error: \`${e}\``)
  }
}


module.exports.help = {
  name: "join",
  aliases: ['join'],
  usage: "join",
  description: "Join in your voice channel",
  inVoiceChannel: true,
  sameVoiceChannel: true,
  botSendPerms: ['SEND_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  botEmbedPerms: ['EMBED_LINKS']
}