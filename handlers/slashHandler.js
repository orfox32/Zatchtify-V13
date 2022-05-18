const Client = require('../index').Client
const fs = require('fs')
const chalk = require ('chalk');
module.exports = (Client) => {
  fs.readdirSync('./SlashCommands/').forEach(dir => {

    fs.readdir(`./SlashCommands/${dir}`, (err, files) => {

        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");

        if (jsFiles.length <= 0) {
          console.log("[SlashCommand Handler] Can't find any commands!");
          return;
        }

        jsFiles.forEach(file => {

            var fileGet = require(`../SlashCommands/${dir}/${file}`);
            console.log(chalk.red(`\n[SlashCommand Handler] - File ${file} was loaded`))

            try {
                Client.SlashCmds.set(fileGet.help.name, fileGet);

            } catch (err) {
                return console.log(err);
            }
        });
    });
});
}