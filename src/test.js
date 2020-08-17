const Discord = require("discord.js");

let config = require("../config.json");

module.exports.run = async (bot, msg, args) => {
    if (msg.author.id !== config.owner) return msg.reply(`вы не владелец бота.`).then(() => console.log(`[WARN] ${msg.author.id} tried to use test`));

    try {
        msg.reply(`${msg.member.displayName.toLowerCase()}`)
    } catch (e) {
        msg.reply(`${e.message}`)
    }
}

/*

    Ну и что ты тут делаешь? Что-то интересное нашел, да?
    Это я разбирался с тем, как создать текстовый канал название которого, соответсвовало бы никнейму пользователя.
    А вообще, если хочешь по-эксперементировать, то лучше пользуйся этим файлом.

    Кстати, у меня тоже есть Discord сервер, найти можешь в моем профиле на github! :^)

*/

module.exports.help = {
    name: "test"
}