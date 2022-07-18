const {InteractionType} = require('discord.js');
module.exports = (bot) => {
    bot.on("interactionCreate", async (interaction)=> {
        if(interaction.type === InteractionType.ApplicationCommand) { //Проверка на слэш команду
            const argsF = {
                slash: true //Пригодиться для понятия того, что мы имеет дело со слэш командой
            }; //Создание аргументов
            if(interaction.options._group) argsF.group = interaction.options._group; //Если это группа - добавить в аргумент
            if(interaction.options._subcommand) argsF.subcommand = interaction.options._subcommand; //Если это sub группа - добавить в аргумент
            for (const it of interaction.options._hoistedOptions) argsF[it.name] = it.value; //Добавить опции в аргументы
            const CMD = await bot.commands.get(interaction.commandName); //Найти команды в боте
            const args = argsF; //Приравнивание аргументов
            interaction.author = interaction.user; //Ну просто чтоб не путаться при вызове
            if(CMD) CMD(bot, interaction, args, argsF) //Если есть команда - вызвать её.
            .catch(err => console.error(err));
        }
    });
};