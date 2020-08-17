const Discord = require("discord.js");
module.exports.run = async (bot, msg, args, cmd) => {
let slap = require("./json/slap.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${slap.phrases[Math.floor(Math.random() * slap.phrases.length)]} ${msg.author.username}.`)
    .setImage(slap.image[Math.floor(Math.random() * slap.image.length)])
    .setTimestamp()
    .setColor(`#${slap.color[Math.floor(Math.random() * slap.color.length)]}`)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${slap.phrasea[Math.floor(Math.random() * slap.phrasea.length)]}  ${sayMsg}`)
        .setImage(slap.image[Math.floor(Math.random() * slap.image.length)])
        .setTimestamp()
        .setColor(`#${slap.color[Math.floor(Math.random() * slap.color.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "slap"
}