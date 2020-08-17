const Discord = require("discord.js");
module.exports.run = async (bot, msg, args, cmd) => {
let greet = require("./json/greet.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${greet.phrases[Math.floor(Math.random() * greet.phrases.length)]} ${msg.author.username}`)
    .setImage(greet.image[Math.floor(Math.random() * greet.image.length)])
    .setTimestamp()
    .setColor(`#${greet.color[Math.floor(Math.random() * greet.color.length)]}`)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${greet.phrasea[Math.floor(Math.random() * greet.phrasea.length)]} ${sayMsg}`)
        .setImage(greet.image[Math.floor(Math.random() * greet.image.length)])
        .setTimestamp()
        .setColor(`#${greet.color[Math.floor(Math.random() * greet.color.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "greet"
}