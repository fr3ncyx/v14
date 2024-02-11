const {Client} = require("discord.js");
const mongoose = require('mongoose');
const config = require("../../config.json");
const Levels = require("discord.js-leveling")

module.exports = {
    name:"ready",
    once: true,
    async execute(client) {
        mongoose.set('strictQuery', false);
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        });

        if (mongoose.connect) {
            console.log('MongoDB connesso con successo')
        }

        Levels.setURL(config.mongodb);

        console.log(`${client.user.username} is now online`);
    }
}