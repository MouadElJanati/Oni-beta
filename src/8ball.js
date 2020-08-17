const Discord = require("discord.js");

let fortunes = require("./json/fortunes.json");

module.exports.run = async (bot, msg, args, cmd) => {
    let sayMsg = args.join(" ");
    if (!sayMsg)
        return msg.reply(`Нечего предугадывать...`)

    msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, `${msg.author.avatarURL}`)
        .addField(`${msg.author.username} справшивает`, `${sayMsg}`)
        .addField(`Мой ответ`, fortunes.list[Math.floor(Math.random() * fortunes.list.length)])
        .setFooter(`ID ${msg.author.id}`)
        .setTimestamp()
        .setColor(`#${fortunes.rainbow[Math.floor(Math.random() * fortunes.rainbow.length)]}`)

    msg.channel.send({
        embed
    });
    return

}

module.exports.help = {
    name: "8ball"
}