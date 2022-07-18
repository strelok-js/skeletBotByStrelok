module.exports = (guild = {id: "!", name: "!"}) => {
    return {
        id: guild.id,
        name: guild.name,
        members: {}, //Удалять запрещаю!
        prefix: "g/" //Префикс по умолчанию. 
    };
};