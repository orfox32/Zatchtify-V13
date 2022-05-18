const wait = require('util').promisify(setTimeout);
const discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const ee = require("../../settings/embed.json");

module.exports.run = async (Client, inter) => {

    let start = Date.now();

    let embed1 = new discord.MessageEmbed()
    .setDescription(`📶Pinging....`)
    .setColor(ee.color)

    await inter.reply({
        embeds: [embed1]
      })
    await wait(2000);
    let end = Date.now();

    let embed = new discord.MessageEmbed()
      .setTitle("Ping!")
      .addField("API Latency", `${Math.round(Client.ws.ping)}ms`, true)
      .addField("Bot Latency", `${end - start}ms`, true)
      .setColor(ee.color);

   inter.editReply({ embeds: [embed] }).catch((e) => inter.followUp(e));
}

module.exports.help = {
    name: 'ping',   
}