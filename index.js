const discord = require('discord.js')
const { TOKEN } = require('./settings/config')
const fs = require('fs')
const keepAlive = require('./server.js');
require("dotenv").config()

const Client = new discord.Client({
    shards: "auto",
    intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MEMBERS,discord.Intents.FLAGS.DIRECT_MESSAGES,
    discord.Intents.FLAGS.GUILD_MESSAGES,
    discord.Intents.FLAGS.GUILD_VOICE_STATES],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
})
module.exports.Client = Client

require("./Utility/ConnectDB")();

Client.setMaxListeners(50);
require('events').defaultMaxListeners = 50;

Client.config = require('./settings/config')
Client.commands = new discord.Collection()
Client.aliases = new discord.Collection()
Client.events = new discord.Collection()
Client.SlashCmds = new discord.Collection()
Client.categories = fs.readdirSync("./commands/");


["commandHandler", "eventHandler", "slashHandler", "distubeHandler"].forEach((handler) => {
    require(`./handlers/${handler}`)(Client)
});
  
keepAlive();
Client.login(TOKEN)

process.on('unhandledRejection', (reason, p) => {
    console.log(' [Error_Handling] :: Unhandled Rejection/Catch');
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(' [Error_Handling] :: Uncaught Exception/Catch');
    console.log(err, origin);
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(' [Error_Handling] :: Uncaught Exception/Catch (MONITOR)');
    console.log(err, origin);
});
/*process.on('multipleResolves', (type, promise, reason) => {
    console.log(' [Error_Handling] :: Multiple Resolves');
    console.log(type, promise, reason);
});*/