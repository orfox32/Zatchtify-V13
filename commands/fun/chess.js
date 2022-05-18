//832012774040141894
const discord = require('discord.js')
const { MessageEmbed, MessageActionRow, MessageButton  } = require('discord.js')
const ee = require("../../settings/embed.json");
const fetch = require('node-fetch')
const config = require('../../settings/config')

module.exports.run = async (Client, message, args, prefix) => {
    try{
        const {channel} = message.member.voice;
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: "832012774040141894",
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${config.token}`,
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
            .then(invite =>{
                if(!invite.code) return message.channel.send(`\`❌ ERROR | An error occurred\``)
                const embed = new MessageEmbed().setColor('PURPLE')
                const button = new MessageActionRow().addComponents(

                    new MessageButton().setLabel('Click Me!').setURL(`https://discord.com/invite/${invite.code}`).setStyle('LINK')
        
                )
                embed.setDescription('**Click The Button Below**')
                embed.setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL())
                embed.setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
                message.channel.send({embeds: [embed], components: [button]})
            })
    
        } catch (e) {
            console.log(e)
            return message.channel.send({embeds: [new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setDescription(`\`❌ ERROR | An error occurred\``)
            ]})
      }
    }

module.exports.help = {
    name: "chess",
    aliases: ['chess'],
    description: 'chess together',
    inVoiceChannel: true,
    sameVoiceChannel: true,
}