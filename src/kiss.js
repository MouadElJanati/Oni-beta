const Discord = require("discord.js");
module.exports.run = async (bot, msg, args, cmd) => {
let kiss = require("./json/kiss.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${kiss.phrases[Math.floor(Math.random() * kiss.phrases.length)]} ${msg.author.username}.`)
    .setColor(0xff0000)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${kiss.phrasea[Math.floor(Math.random() * kiss.phrasea.length)]}  ${sayMsg}`)
        .setImage(kiss.image[Math.floor(Math.random() * kiss.image.length)])
        .setTimestamp()
        .setColor(`#${kiss.color[Math.floor(Math.random() * kiss.color.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "kiss"
}