const chalk = require("chalk");

module.exports = (Client, id) => {
    console.log(chalk.yellowBright(`[${String(new Date).split(" ", 5).join(" ")}] || ==> || Shard #${id} Reconnecting`))
}