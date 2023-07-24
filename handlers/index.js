module.exports = (bot) => {
    require('./messageHandler.js')(bot);
    require('./interactionHandler.js')(bot);
};