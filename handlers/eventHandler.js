const Client = require('../index').Client
const fs = require('fs')
const chalk = require ('chalk');

module.exports = (Client) => {
  fs.readdirSync('./events/').forEach(dir => {

        var jsFiles = fs.readdirSync('./events/').filter(f => f.split(".").pop() === "js")

        if (jsFiles.length <= 0) return console.log("[Event Handler] Can't find any events!")
        let check = false
        jsFiles.forEach(event => {

            const eventGet = require(`../events/${event}`)
            
             
            try {
                Client.events.set(eventGet.name, eventGet)
                if(check == false){
                     //console.log(chalk.blue(`\n[Event Handler] - File ${event} was loaded`))
                    check = true
                }
                 
            } catch (err) {
                return console.log(err)
            }
            
        });
});
}