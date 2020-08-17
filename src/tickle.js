const Discord = require("discord.js");
module.exports.run = async (bot, msg, args, cmd) => {
let tickle = require("./json/tickle.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${tickle.phrases[Math.floor(Math.random() * tickle.phrases.length)]} ${msg.author.username}`)
    .setImage(tickle.image[Math.floor(Math.random() * tickle.image.length)])
    .setTimestamp()
    .setColor(`#${tickle.color[Math.floor(Math.random() * tickle.color.length)]}`)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${tickle.phrasea[Math.floor(Math.random() * tickle.phrasea.length)]} ${sayMsg}`)
        .setImage(tickle.image[Math.floor(Math.random() * tickle.image.length)])
        .setTimestamp()
        .setColor(`#${tickle.color[Math.floor(Math.random() * tickle.color.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "tickle"
}