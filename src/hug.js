const Discord = require("discord.js");
module.exports.run = async (bot, msg, args, cmd) => {
let hugs = require("./json/hugs.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${hugs.phrases[Math.floor(Math.random() * hugs.phrases.length)]} ${msg.author.username}`)
    .setImage(hugs.image[Math.floor(Math.random() * hugs.image.length)])
    .setTimestamp()
    .setColor(`#${hugs.rainbow[Math.floor(Math.random() * hugs.rainbow.length)]}`)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${hugs.phrasea[Math.floor(Math.random() * hugs.phrasea.length)]} ${sayMsg}`)
        .setImage(hugs.image[Math.floor(Math.random() * hugs.image.length)])
        .setTimestamp()
        .setColor(`#${hugs.rainbow[Math.floor(Math.random() * hugs.rainbow.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "hug"
}