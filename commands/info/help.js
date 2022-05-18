const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");
const { readdirSync } = require("fs");

module.exports.run = async (Client, message, args, text, prefix) => {
    try{
        const roleColor =
        message.guild.me.displayHexColor === "#000000"
          ? "#ffffff"
          : message.guild.me.displayHexColor;
  
      if (!args[0]) {
        let categories = [];
        const ignoredCategories = ['owner']
        readdirSync("./commands/").forEach((dir) => {
          if(ignoredCategories.includes(dir)) return;
          const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
            file.endsWith(".js")
          );
  
          const cmds = commands.filter((command) => {
            let file = require(`../../commands/${dir}/${command}`);

            return !file.help.hidden;
          }).map((command) => {
            let file = require(`../../commands/${dir}/${command}`);
            if (!file.help.name) return "No command name.";
  
            let name = file.help.name.replace(".js", "");
  
            return `\`${name}\``;
          });
  
          let data = new Object();
  
          data = {
            name: dir.toUpperCase(),
            value: cmds.length === 0 ? "In progress." : cmds.join(" "),
          };
  
          categories.push(data);
        });
  
        const embed2 = new MessageEmbed()
          .setAuthor(`${message.guild.me.displayName} Help Command!`, message.guild.iconURL({ dynamic: true }))
          .setThumbnail(Client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
          .setTitle("📬 Need help? Here are all of my commands:")
          .addFields(categories)
          .setDescription(
            `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help invite\`.`
          )
          .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setColor('#36393F');
        return message.channel.send({embeds: [embed2]});
      } else {
        const command =
          Client.commands.get(args[0].toLowerCase()) ||
          Client.commands.find(
            (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
          );
  
        if (!command) {
          const embed1 = new MessageEmbed()
            .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
            .setColor("#36393F");
          return message.channel.send({embeds: [embed1]});
        }
  
        const embed = new MessageEmbed()
          .setAuthor(`${message.guild.me.displayName} Help Command!`, message.guild.iconURL({ dynamic: true }))
          .setThumbnail(Client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
          .setTitle("__Command Details:__")
          .addField("❯ Prefix:", `\`${prefix}\``)
          .addField(
            "❯ Name:",
            command.help.name ? `\`${command.help.name}\`` : "No name for this command.", 
          )
          .addField(
            "❯ Aliases:",
            command.help.aliases
              ? `\`${command.help.aliases.join("` `")}\``
              : "No aliases for this command."
          )
          .addField(
            "❯ Usage:",
            command.help.usage
              ? `\`${prefix}${command.help.usage}\``
              : `\`${prefix}\``
          )
          .addField(
            "❯ Description:",
            command.help.description
              ? `\`${command.help.description}\``
              : "No description for this command."
          )
          .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setColor('#36393F');
        return message.channel.send({embeds: [embed]});
      }
        
       } catch (error) {
           console.log(error)
       }

}

module.exports.help = {
    name: "help",
    aliases: ['help'],
    description: 'Get all the Information of the commands'
}