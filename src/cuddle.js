const Discord = require("discord.js");
module.exports.run = async (bot, msg, args, cmd) => {
let cuddle = require("./json/cuddle.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${cuddle.phrases[Math.floor(Math.random() * cuddle.phrases.length)]} ${msg.author.username}`)
    .setImage(cuddle.image[Math.floor(Math.random() * cuddle.image.length)])
    .setTimestamp()
    .setColor(`#${cuddle.color[Math.floor(Math.random() * cuddle.color.length)]}`)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${cuddle.phrasea[Math.floor(Math.random() * cuddle.phrasea.length)]} ${sayMsg}`)
        .setImage(cuddle.image[Math.floor(Math.random() * cuddle.image.length)])
        .setTimestamp()
        .setColor(`#${cuddle.color[Math.floor(Math.random() * cuddle.color.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "cuddle"
}