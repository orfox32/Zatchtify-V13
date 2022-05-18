const { Schema, model } = require("mongoose")

const PrefixSchema = new Schema({
    GuildID: {
        type: String,
        unique: true,
        required: true,
    },
    Prefix: {
        type: String,
        required: false,
    },
}) 

module.exports = model("guildConfigs", PrefixSchema)