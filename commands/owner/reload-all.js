const { MessageEmbed } = require("discord.js");
const config = require("../../settings/config");
const ee = require("../../settings/embed.json");
const glob = require('glob');

module.exports.run = async (Client, message, args, prefix) => {
      if(message.author.id !== "530694588327919616") return message.channel.send({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL({dynamic : true}))
          .setDescription(`\`❌ ERROR | Sorry You Can't Do That\``)
      ]})
  Client.commands.sweep(() => true )
  glob(`${__dirname}/../**/*.js`, async(err, filePaths) => {
    if(err) return console.log(err);
    filePaths.forEach((file) => {
      delete require.cache[require.resolve(file)];

      const pull = require(file);

      if(pull.help.name){
        console.log(`Reloaded ${pull.help.name} (cmd)`);
        Client.commands.set(pull.help.name, pull);
      }
      if(pull.help.aliases && Array.isArray(pull.aliases)){
        pull.help.aliases.forEach((alias) => {
          Client.aliases.set(alias, pull.help.name);
        })

      }
    })
  })
  message.channel.send({embeds: [new MessageEmbed()
    .setAuthor(`${Client.user.username}`, Client.user.displayAvatarURL())
    .setColor('#00ff00')
    .setDescription(`\`✅ DONE | Reloading All The Commands\``)
  ]})
}

module.exports.help = {
        name: "reload",
        aliases: ['reloadall', 'reload'],
        description: 'reload all of the commands'
    }
