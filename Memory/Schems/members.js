module.exports = (member = {id: "!", user: {username:"!"}, guild: {id: "!"}}) => {
    return {
        id: member.id,
        name: member.user.username,
        guildId: member.guild.id //Удалять запрещаю!
    };
};