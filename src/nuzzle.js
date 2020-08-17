const Discord = require("discord.js");
module.exports.run = async (bot, msg, args, cmd) => {
let nuzzle = require("./json/nuzzle.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${nuzzle.phrases[Math.floor(Math.random() * nuzzle.phrases.length)]} ${msg.author.username}`)
    .setImage(nuzzle.image[Math.floor(Math.random() * nuzzle.image.length)])
    .setTimestamp()
    .setColor(`#${nuzzle.color[Math.floor(Math.random() * nuzzle.color.length)]}`)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${nuzzle.phrasea[Math.floor(Math.random() * nuzzle.phrasea.length)]} ${sayMsg}`)
        .setImage(nuzzle.image[Math.floor(Math.random() * nuzzle.image.length)])
        .setTimestamp()
        .setColor(`#${nuzzle.color[Math.floor(Math.random() * nuzzle.color.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "nuzzle"
}