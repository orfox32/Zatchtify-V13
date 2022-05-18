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

    if (!args[0])
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`\`❌ ERROR | You didn't provide a Loop method\``)
          .setDescription(`\`Usage: ${prefix}loop [0/1/2]\``)
        ]
      });
    let loopstate = args[0].toString();
    if (loopstate.toLowerCase() === "song") loopstate = "1";
    if (loopstate.toLowerCase() === "queue") loopstate = "2";
    if (loopstate.toLowerCase() === "off") loopstate = "0";
    if (loopstate.toLowerCase() === "track") loopstate = "1";
    if (loopstate.toLowerCase() === "q") loopstate = "2";
    if (loopstate.toLowerCase() === "qu") loopstate = "2";
    if (loopstate.toLowerCase() === "disable") loopstate = "0";

    loopstate = Number(loopstate);
    loopstates = {
      "0": "off",
      "1": "song",
      "2": "queue"
    }
    if (0 <= loopstate && loopstate <= 2) {
      Client.distube.setRepeatMode(message, parseInt(loopstate));
      message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`\`🔁 | Changed The Loop State To: ${loopstates[loopstate]}\``)]
      })
    }
    else {
      return message.channel.send({embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`\`❌ ERROR | You didn't provide a Loop method\``)
        .setDescription(`\`Usage: ${prefix}loop [0/1/2]\``)
      ]})
    }

  } catch (e) {
    console.log(`❌ | Error: \`${e}\``)
  }
}

module.exports.help = {
  name: "loop",
  aliases: ['loop', 'repeat'],
  usage: "loop [0/1/2]",
  description: "Change the loop State of a Song or a Queue!",
  inVoiceChannel: true,
  sameVoiceChannel: true,
  botSendPerms: ['SEND_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  botEmbedPerms: ['EMBED_LINKS']
}