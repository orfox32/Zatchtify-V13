const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");
const { GeniusLyrics } = require('genius-discord-lyrics');

module.exports.run = async (Client, message, args, text, prefix) => {
try{
  const genius = new GeniusLyrics('ZJhp8UwNe3AVAkdkgVwJM54EHwHAOj7nPxNyWS7W6qvHqwJvSlS9jL1Ykf3ca53P');
  
  const member = message.mentions.members.first() || message.member;

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

        let queue = Client.distube.getQueue(message.guild.id);
        let song = queue.songs[0].name

        message.channel.send({
            embeds: [new MessageEmbed()
                .setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL())
                .setDescription(`\`🔍 | Searching...\``)
                .setFooter(ee.footertext, ee.footericon)
                .setColor("#a418c7")
            ]
        }).then(msg => {
            setTimeout(() => msg.delete(), 20000)
        })
            .catch(e => {
                console.log(e)
            })

            const lyrics = await genius.fetchLyrics(song);

            message.channel.send({embeds: [new MessageEmbed()
            .setColor("#a418c7")
            .setTitle(song)
            .setThumbnail(`${queue.songs[0].thumbnail}`)
            .setDescription(`>>>${lyrics.substr(0, 4096)}`)
            .setFooter(ee.footertext, ee.footericon)
            ]})


} catch (e) {
    return message.channel.send({embeds: [new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setTimestamp()
      .setFooter(ee.footertext, ee.footericon)
      .setDescription(`\`sorry i can't find the lyrics of the song\``)
    ]})
  }
}


module.exports.help = {
  name: "lyrics",
  aliases: ['lyrics'],
  usage: "lyrics",
  description: "Find a lyrics of a song",
  inVoiceChannel: false,
  botSendPerms: ['SEND_MESSAGES'],
  botPerms: ['MANAGE_MESSAGES'],
  botEmbedPerms: ['EMBED_LINKS']
}