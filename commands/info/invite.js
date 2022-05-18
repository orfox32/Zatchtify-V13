const discord = require('discord.js')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const ee = require("../../settings/embed.json");


module.exports.run = async (Client, message, args, prefix) => {
    try{

        const embed = new MessageEmbed().setColor('GREEN')
        
        const button = new MessageActionRow().addComponents(

            new MessageButton().setLabel('Invite Me!').setURL(`https://discord.com/api/oauth2/authorize?client_id=${Client.user.id}&permissions=1076980800&scope=bot`).setStyle('LINK')

        )

        embed.setDescription('**This is my Invite Link**')
        embed.setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL())
        embed.setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
        await message.channel.send({embeds: [embed], components: [button]})
       } catch (e) {
            console.log(`❌ | Error: \`${e}\``)
       }

}

module.exports.help = {
    name: "invite",
    aliases: ['invite', 'inv'],
    description: 'Get my invite code'
}