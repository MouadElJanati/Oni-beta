const Discord = require("discord.js");
module.exports.run = async (bot, msg, args, cmd) => {
let smile = require("./json/smile.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${smile.phrases[Math.floor(Math.random() * smile.phrases.length)]} ${msg.author.username}`)
    .setImage(smile.image[Math.floor(Math.random() * smile.image.length)])
    .setTimestamp()
    .setColor(`#${smile.color[Math.floor(Math.random() * smile.color.length)]}`)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${smile.phrasea[Math.floor(Math.random() * smile.phrasea.length)]} ${sayMsg}`)
        .setImage(smile.image[Math.floor(Math.random() * smile.image.length)])
        .setTimestamp()
        .setColor(`#${smile.color[Math.floor(Math.random() * smile.color.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "smile"
}