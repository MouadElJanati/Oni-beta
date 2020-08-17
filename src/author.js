const Discord = require("discord.js");

const me = require("./json/author.json");

module.exports.run = async (bot, msg, args) => {


    let aboutTXT = "Привет! Я Oni, я помогаю разобраться с жалобами! Кстати, я приватный бот. \nЕсли тебе потребуется помощь в использовании меня, то тебе стоит обратиться в Support Server (ссылка ниже)";

    let embed = new Discord.RichEmbed()
        .setTitle(`Об авторе`)
        .setAuthor(`${me.profile.tag}`, `${me.profile.avatar}`)
        .setDescription(`Support Server: [Invite URL](https://discord.gg/TVchCE8) \n\nGitHub: [@TFlashgamer](null) \nVK: [${me.vk.n}](${me.vk.url}) \nDiscord: [${me.discord.n}](${me.discord.url}) \n\n${me.donate.txt}\nСпособы поддержки: [${me.donate.n0}](${me.donate.url0}), [${me.donate.n1}](${me.donate.url1})`)
        .setFooter(`Инициировал сообщение: ${msg.author.tag}`)
        .setTimestamp()
        .setColor("#7289da")

    msg.channel.send(aboutTXT, { embed });
}

module.exports.help = {
    name: "about"
}