const chalk = require("chalk");

module.exports = (Client, id, replayedEvents) => {
    console.log(chalk.yellow(`[${String(new Date).split(" ", 5).join(" ")}] || ==> || Shard #${id} Resumed`))
}