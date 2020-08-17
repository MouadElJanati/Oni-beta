const Discord = require("discord.js");
module.exports.run = async (bot, msg, args, cmd) => {
let pat = require("./json/pat.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${pat.phrases[Math.floor(Math.random() * pat.phrases.length)]} ${msg.author.username}`)
    .setImage(pat.image[Math.floor(Math.random() * pat.image.length)])
    .setTimestamp()
    .setColor(`#${pat.color[Math.floor(Math.random() * pat.color.length)]}`)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${pat.phrasea[Math.floor(Math.random() * pat.phrasea.length)]} ${sayMsg}`)
        .setImage(pat.image[Math.floor(Math.random() * pat.image.length)])
        .setTimestamp()
        .setColor(`#${pat.color[Math.floor(Math.random() * pat.color.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "pat"
}