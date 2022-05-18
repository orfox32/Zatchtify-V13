const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");

module.exports.run = async (Client, message, args, prefix) => {
    try{
        
        const embed = new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`📶Pinging....`)
        const messageHandle = await message.channel.send({ embeds: [embed] });
        const newEmbed = new MessageEmbed()
        .setColor(ee.color)
        .setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL())
        .setTitle(`📶 Ping is \`${Math.round(Client.ws.ping)}ms\``)
        messageHandle.edit({embeds: [newEmbed]})
        
       } catch (error) {
           console.log(error)
       }

}

module.exports.help = {
    name: "ping",
    aliases: ['ping'],
    description: 'Get the latency of the bot'
}