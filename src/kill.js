const Discord = require("discord.js");

let kills = require("./json/kills.json");

module.exports.run = async (bot, msg, args, cmd) => {
    let sayMsg = args.join(" ");
    if (!sayMsg)
        return msg.reply(`И кого вы собрались убить?`)

    msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, `${msg.author.avatarURL}`)
        .addField(`${msg.author.username} решил убить`, `${sayMsg}`)
        .setDescription(kills.list[Math.floor(Math.random() * kills.list.length)])
        .setFooter(`ID ${msg.author.id}`)
        .setImage(kills.image[Math.floor(Math.random() * kills.image.length)])
        .setTimestamp()
        .setColor(`#${kills.rainbow[Math.floor(Math.random() * kills.rainbow.length)]}`)

    msg.channel.send({
        embed
    });
    return

}

module.exports.help = {
    name: "kill"
}