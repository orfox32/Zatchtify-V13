const discord = require('discord.js')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const ee = require("../../settings/embed.json");
const moment = require('moment')
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');

module.exports.run = async (Client, message, args, text, prefix) => {
    try{

        const d = moment.duration(message.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
        const clientStats = stripIndent`
          Servers   :: ${message.client.guilds.cache.size}
          Users     :: ${message.client.users.cache.size}
          Channels  :: ${message.client.channels.cache.size}
          WS Ping   :: ${Math.round(message.client.ws.ping)}ms
          Uptime    :: ${days} and ${hours}
          Default Prefix :: ${prefix}
       `;

       const { totalMemMb, usedMemMb } = await mem.info();
        const serverStats = stripIndent`
          OS        :: ${await os.oos()}
          Cores     :: ${cpu.count()}
          CPU Usage :: ${await cpu.usage()} %
          RAM       :: ${totalMemMb} MB
          RAM Usage :: ${usedMemMb} MB
        `;

          const embed = new MessageEmbed().setColor('BLURPLE')
    
        const button = new MessageActionRow().addComponents(

            new MessageButton().setLabel('Invite Me!').setURL(`https://discord.com/api/oauth2/authorize?client_id=${Client.user.id}&permissions=1076980800&scope=bot`).setStyle('LINK')

        )

        embed.addField('Commands', `\`${message.client.commands.size}\` commands`, true)
        embed.addField('Aliases', `\`${message.client.aliases.size}\` aliases`, true)
        embed.addField('Client', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        embed.addField('Server', `\`\`\`asciidoc\n${serverStats}\`\`\``)
        embed.setAuthor(`${Client.user.username} Info`, Client.user.displayAvatarURL({dynamic: true}))
        embed.setThumbnail(Client.user.displayAvatarURL({dynamic: true}))
        embed.setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true }))
        await message.channel.send({embeds: [embed], components: [button]})
        
       } catch (error) {
           console.log(error)
       }

}

module.exports.help = {
    name: "bot-info",
    aliases: ['bot', 'bot-info'],
    description: 'Get all my information About me!'
}
