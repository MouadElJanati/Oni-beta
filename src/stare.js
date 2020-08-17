const Discord = require("discord.js");
module.exports.run = async (bot, msg, args, cmd) => {
let stare = require("./json/stare.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${stare.phrases[Math.floor(Math.random() * stare.phrases.length)]} ${msg.author.username}`)
    .setImage(stare.image[Math.floor(Math.random() * stare.image.length)])
    .setTimestamp()
    .setColor(`#${stare.color[Math.floor(Math.random() * stare.color.length)]}`)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${stare.phrasea[Math.floor(Math.random() * stare.phrasea.length)]} ${sayMsg}`)
        .setImage(stare.image[Math.floor(Math.random() * stare.image.length)])
        .setTimestamp()
        .setColor(`#${stare.color[Math.floor(Math.random() * stare.color.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "stare"
}