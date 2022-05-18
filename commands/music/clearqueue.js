const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");

module.exports.run = async (Client, message, args, text, prefix) => {

    const member = message.mentions.members.first() || message.member
    const { channel } = message.member.voice

    if (!message.guild.me.permissionsIn(message.channel).has("READ_MESSAGE_HISTORY"))
    return message.author.send({embeds: [new MessageEmbed()
    .setColor(ee.wrongcolor)
    .setFooter(ee.footertext, ee.footericon)
    .setDescription(`${ee.error} I am not allowed to \`clear\` your queue, i need \`READ_MESSAGE_HISTORY\` permissions`)]})

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


    const queue = Client.distube.getQueue(message.guild.id);
    let amount = queue.songs.length - 2
    queue.songs = [queue.songs[0]]

    message.reply({
        embeds: [new MessageEmbed()
            .setColor(ee.color)
            .setTimestamp()
            .setTitle(`🗑 **Cleared the Queue and deleted ${amount} Songs!**`)
            .setFooter(`💢 Removed by: ${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))]
    })

    try {

    } catch (e) {
        console.log(`❌ | Error: \`${e}\``)
    }
}

module.exports.help = {
    name: "clear",
    aliases: ['clearqueue', 'removeall'],
    usage: `clear`,
    description: `Removes all the Song from the Queue`,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    botSendPerms: ['SEND_MESSAGES'],
    botPerms: ['MANAGE_MESSAGES'],
    botEmbedPerms: ['EMBED_LINKS']
}