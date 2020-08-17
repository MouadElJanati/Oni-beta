const Discord = require("discord.js");
module.exports.run = async (bot, msg, args, cmd) => {
let teehee = require("./json/teehee.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${teehee.phrases[Math.floor(Math.random() * teehee.phrases.length)]} ${msg.author.username}`)
    .setImage(teehee.image[Math.floor(Math.random() * teehee.image.length)])
    .setTimestamp()
    .setColor(`#${teehee.color[Math.floor(Math.random() * teehee.color.length)]}`)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${teehee.phrasea[Math.floor(Math.random() * teehee.phrasea.length)]} ${sayMsg}`)
        .setImage(teehee.image[Math.floor(Math.random() * teehee.image.length)])
        .setTimestamp()
        .setColor(`#${teehee.color[Math.floor(Math.random() * teehee.color.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "teehee"
}