const Client = require('../index').Client
const { createCmd, globalCmd } = require('../DataHandler')
const config  = require('../settings/config')
const chalk = require ('chalk');
const { stripIndents } = require("common-tags")


Client.on('ready', async () => {
   
    
    let prefix = config.prefix
    const date = new Date()
    console.log(chalk.blue(stripIndents`${Client.user.tag} online.
    ${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear().toString().padStart(4, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`));

    global.activities = [`${Client.guilds.cache.size} servers!`, `${Client.users.cache.size} users!`], i = 0;
    setInterval(() => Client.user.setActivity(`${prefix}help | ${activities[i++ % activities.length]}`, { type: "STREAMING", url:'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO' }), 10000);
    `${Client.channels.cache.size} channels!`,


    globalCmd(Client)
   createCmd(Client)
})
