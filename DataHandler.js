async function createCmd(Client, guildId) {
    const data = [
        {
        name: 'info',
        description: 'See about Bot Info',
        
    },
        {
        name: 'ping',
        description: 'pong',
        type: "CHAT_INPUT",
        }
    
    ]
 await Client.guilds.cache.get(guildId)?.commands.set(data)
}

async function globalCmd(Client) {
    const data = [
        {
        name: 'info',
        description: 'See about Bot Info',
         },
        {
        name: 'ping',
        description: 'pong!',
        type: "CHAT_INPUT",
        }
    
    ]
 await Client.application?.commands.set(data)
}

module.exports = { createCmd, globalCmd }