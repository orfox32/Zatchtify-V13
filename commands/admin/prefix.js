const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");
const Schema = require('../../Models/GuildConfig')

module.exports.run = async (Client, message, args, text, prefix) => {
    try{
        
        const guildConfig = await Schema.findOne({ 
            GuildID: message.guildId
        })
        const embed = new MessageEmbed().setColor(ee.color)

       if(!args.length){

        embed.setDescription(`Prefix for **${message.guild.name}** is **${guildConfig?.Prefix ?? prefix}**`)

           return await message.channel.send({embeds: [embed]})
       }

       if(args[0] === 'set'){
           const newPrefix = args[1]

           if(newPrefix.length > 5){
            embed.setDescription(`Prefix length must be less than 5!`)

            return await message.channel.send({embeds: [embed]})
           }

           if(!newPrefix){
            embed.setDescription(`You need to Provide a New Prefix to Set! \`${guildConfig?.Prefix ?? prefix}prefix set <new-prefix>\``)

            return await message.channel.send({embeds: [embed]})
           }
           await Schema.findOneAndUpdate({ 
            GuildID: message.guildId
           }, {
               Prefix: newPrefix
           }, {
               upsert: true
           })
           embed.setDescription(`Prefix for **${message.guild.name}** has been set to **${newPrefix}**`)

           return await message.channel.send({embeds: [embed]})
       }
        
       } catch (error) {
           console.log(error)
       }

}

module.exports.help = {
    name: "prefix",
    aliases: ['prefix'],
    userPerms: ['ADMINISTRATOR'],
    botSendPerms: ['SEND_MESSAGES'],
    botPerms: ['MANAGE_MESSAGES'],
    botEmbedPerms: ['EMBED_LINKS'],
    description: 'Change your Preferred Prefix'
}