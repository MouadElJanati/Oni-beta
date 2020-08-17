const Discord = require("discord.js");
module.exports.run = async (bot, msg, args, cmd) => {
let poke = require("./json/poke.json");
let embedd = new Discord.RichEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
    .setDescription(`${poke.phrases[Math.floor(Math.random() * poke.phrases.length)]} ${msg.author.username}`)
    .setImage(poke.image[Math.floor(Math.random() * poke.image.length)])
    .setTimestamp()
    .setColor(`#${poke.color[Math.floor(Math.random() * poke.color.length)]}`)



    let sayMsg = args.join(" ");
    if (!sayMsg)
    
return msg.channel.send(embedd);
msg.delete(); // Удаляет сообщение с командой

    let embed = new Discord.RichEmbed()
        .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
        .setDescription(`${msg.author.username} ${poke.phrasea[Math.floor(Math.random() * poke.phrasea.length)]} ${sayMsg}`)
        .setImage(poke.image[Math.floor(Math.random() * poke.image.length)])
        .setTimestamp()
        .setColor(`#${poke.color[Math.floor(Math.random() * poke.color.length)]}`)

    msg.channel.send({
        embed
    });
    
    return

}

module.exports.help = {
    name: "poke"
}