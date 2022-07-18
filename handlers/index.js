module.exports = (bot) => {
    require('./interactionHandler.js')(bot);
    require('./messageHandler.js')(bot);
};