const Discord = require("discord.js");
module.exports.run = async (bot, msg, args, cmd) => {
let highfive = require("./json/highfive.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${highfive.phrases[Math.floor(Math.random() * highfive.phrases.length)]} ${msg.author.username}`)
    .setImage(highfive.image[Math.floor(Math.random() * highfive.image.length)])
    .setTimestamp()
    .setColor(`#${highfive.color[Math.floor(Math.random() * highfive.color.length)]}`)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${highfive.phrasea[Math.floor(Math.random() * highfive.phrasea.length)]} ${sayMsg}`)
        .setImage(highfive.image[Math.floor(Math.random() * highfive.image.length)])
        .setTimestamp()
        .setColor(`#${highfive.color[Math.floor(Math.random() * highfive.color.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "highfive"
}