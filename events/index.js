const fs = require('fs');
module.exports = (bot) => {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`./${file}`);
        const name = file.slice(0,-3);
        bot.on(name, (...args) => event(bot, ...args));
    }
    
    process
        .on('unhandledRejection', err => require('./unhandledRejection')(bot, err))
        .on('uncaughtException', err => require('./uncaughtException')(bot, err));
};