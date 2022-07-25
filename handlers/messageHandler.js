const Discord = require('discord.js');
const fs = require('fs');
module.exports = (bot) => {
    bot.commands = new Discord.Collection(); //Коллекция команд
    bot.commands.any = []; //Корекция дополнительных путей

    const commandFiles = fs.readdirSync('./commands'); //Список файлов команд

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        for (const name of command.names) bot.commands.set(name, command); //Коллекция команд
        bot.commands.any.push(command); //Доп. путь
    }

    bot.on("messageCreate", async (message)=> {
        const {content, author, guild} = message; //Разбивка на компоненты
        const memGuild = guild?bot.Memory.guilds.get(guild.id):null;
        if(
            author.bot || //Если автор - бот
            !memGuild || //Если нет гильди в памяти
            content.slice(0, memGuild.prefix.length) !== memGuild.prefix //Если не начинается на префикс
        ) return; //Не выполняем код дальше
        
        const 
            messageArray = content.toLowerCase().trim().split(' '), 
            command = messageArray[0].replace(memGuild.prefix, ""),
            args = messageArray.slice(1), 
            messageArrayFull = content.trim().split(' '), 
            argsF = messageArrayFull.slice(1),
            commandRun = bot.commands.get(command);

        if(commandRun) commandRun(bot,message,args,argsF) //Вызов функции
        .catch(err => console.error(err));
        //.then(any => console.log(any))
    });
};
