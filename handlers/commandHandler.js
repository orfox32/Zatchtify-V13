const Client = require('../index').Client
const fs = require('fs')
const chalk = require ('chalk');
module.exports = (Client) => {
  fs.readdirSync('./commands/').forEach(dir => {

    fs.readdir(`./commands/${dir}`, (err, files) => {

        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");

        if (jsFiles.length <= 0) {
          console.log("[Command Handler] Can't find any commands!");
          return;
        }

        jsFiles.forEach(file => {

            var fileGet = require(`../commands/${dir}/${file}`);
            console.log(chalk.green(`\n[Command Handler] - File ${file} was loaded`))

            try {
                Client.commands.set(fileGet.help.name, fileGet);

                fileGet.help.aliases.forEach(alias => {
                    Client.aliases.set(alias, fileGet.help.name);
                })

            } catch (err) {
                return console.log(err);
            }
        });
    });
});
}