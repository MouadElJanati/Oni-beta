const Discord = require("discord.js");
module.exports.run = async (bot, msg, args, cmd) => {
let lewd = require("./json/lewd.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${lewd.phrases[Math.floor(Math.random() * lewd.phrases.length)]} ${msg.author.username}`)
    .setImage(lewd.image[Math.floor(Math.random() * lewd.image.length)])
    .setTimestamp()
    .setColor(`#${lewd.color[Math.floor(Math.random() * lewd.color.length)]}`)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${lewd.phrasea[Math.floor(Math.random() * lewd.phrasea.length)]} ${sayMsg}`)
        .setImage(lewd.image[Math.floor(Math.random() * lewd.image.length)])
        .setTimestamp()
        .setColor(`#${lewd.color[Math.floor(Math.random() * lewd.color.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "lewd"
}