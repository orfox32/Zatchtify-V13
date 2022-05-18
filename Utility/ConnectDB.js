const mongoose = require("mongoose")

module.exports = async () => {
    const {MONGO_URI} = process.env

    try{
        await mongoose.connect(MONGO_URI)
        console.log(`[DB] Successfully Connected!`)
    } catch (error) {
        console.log(`[DB] Failed to Connect:`, error)
    }
}