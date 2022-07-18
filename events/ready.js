module.exports = async (bot) => {
    console.log(bot.user.username + " ready!\nSkelet by Strelok");

    const commandsIT = bot.application.commands;
    await commandsIT.fetch(); //Найти все команды

    for (const command of bot.commands.any) {
        if(command.interaction) { //Если слэш команда есть
            const interaction = await commandsIT.cache.find(com=>com.name == command.interaction.name); //Найти команду в боте по названию
            if(!interaction) { //Если команда не была найдена в боте
                commandsIT.create(command.interaction); //Создать команду
            } else  //Если команда есть
            if(JSON.stringify(interaction.options) !== JSON.stringify(command.interaction.options)) {//И параметры команды не совпадают (т.е. команда была изменена)
                interaction.edit(command.interaction); //Редактируем эту команду
            }
        }
    }
    for (const interaction of commandsIT.cache) {
        const command = bot.commands.any.find(el=>el.names.includes(interaction.name));
        if(!command&&interaction.delete) interaction.delete();//Если команды нет и есть возможность - удалить слэш команду
    }
};