const Discord = require("discord.js");
module.exports.run = async (bots, msg, args, cmd) => {
let bite = require("./json/bite.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${bite.phrases[Math.floor(Math.random() * bite.phrases.length)]} ${msg.author.username}`)
    .setImage(bite.image[Math.floor(Math.random() * bite.image.length)])
    .setTimestamp()
    .setColor(`#${bite.color[Math.floor(Math.random() * bite.color.length)]}`)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${bite.phrasea[Math.floor(Math.random() * bite.phrasea.length)]} ${sayMsg}`)
        .setImage(bite.image[Math.floor(Math.random() * bite.image.length)])
        .setTimestamp()
        .setColor(`#${bite.color[Math.floor(Math.random() * bite.color.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "bite"
}