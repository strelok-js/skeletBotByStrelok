const {InteractionType} = require('discord.js');
module.exports = (bot) => bot.on("ready", async ()=> {
    const commands = bot.application.commands;
    await commands.fetch(); //Найти все команды

    for (const command of bot.commands.any) {
        if(command.interaction) { //Если слэш команда есть
            const interaction = commands.cache.find(com=>com.name == command.interaction.name); //Найти команду в боте по названию
            if(!interaction) { //Если команда не была найдена в боте
                commands.create(command.interaction); //Создать команду
            } else  //Если команда есть
            if(JSON.stringify(interaction.options) !== JSON.stringify(command.interaction.options)) {//И параметры команды не совпадают (т.е. команда была изменена)
                interaction.edit(command.interaction); //Редактируем эту команду
            }
        }
    }
    for (const interaction of commands.cache) {
        const command = bot.commands.any.find(el=>el.names.includes(interaction.name));
        if(!command&&interaction.delete) interaction.delete();//Если команды нет - удалить слэш команду
    }

    bot.on("interactionCreate", async (interaction)=> {
        if(interaction.type === InteractionType.ApplicationCommand) { //Проверка на слэш команду
            const argsF = {
                slash: true //Пригодится для понятия того, что мы имеет дело со слэш командой
            }; //Создание аргументов
            if(interaction.options._group) argsF.group = interaction.options._group; //Если это группа - добавить в аргумент.
            if(interaction.options._subcommand) argsF.subcommand = interaction.options._subcommand; //Если это sub группа - добавить в аргумент.
            for (const it of interaction.options._hoistedOptions) argsF[it.name] = it.value; //Добавить опции в аргументы.
            const CMD = await bot.commands.get(interaction.commandName); //Найти команды в боте
            interaction.author = interaction.user; //Ну просто чтоб не путаться при вызове. Не более чем сахарок.
            if(CMD) CMD(bot, interaction, argsF, argsF) //Если есть команда - вызвать её.
            .catch(err => console.error(`Error in ${interaction.commandName}: `+err));
        }
    });   
});