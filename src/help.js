const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
    let cfg = require("./config.json")
    let prefix = cfg.prefix;
    let owner = cfg.owner;

    try {
        let embed = new Discord.RichEmbed()
        .setAuthor("Oni","https://cdn.discordapp.com/avatars/539865580413386783/ec83f6cf28ba561d3ae5e45ead945de3.jpg?size=512")
            .setTitle("Все доступные команды `action`🗯")
            .setColor(0x2b50fd)
            .setImage("https://thumbs.gfycat.com/NervousSmallAustralianfreshwatercrocodile-size_restricted.gif")
            .setThumbnail("https://cdn.discordapp.com/avatars/539865580413386783/ec83f6cf28ba561d3ae5e45ead945de3.jpg?size=512")
            .addField(`💫Комманды действий`,`${prefix}hug - обнять кого-то\n\n${prefix}pat - погладить кого-то\n\n${prefix}slap - ударить кого-то\n\n${prefix}kiss - поцеловать кого-то\n\n${prefix}poke - прикоснуться/толкнуть кого-то\n\n${prefix}bite - укусить кого-то\n\n${prefix}cuddle - прижаться к кому-то\n\n${prefix}greet - поприветствовать кого-то\n\n${prefix}highfive - дать пятюню кому-то\n\n${prefix}lewd - непристойно!!\n\n${prefix}nuzzle - тереться/тыкнуть кого-то\n\n${prefix}smile - улыбнуться кому-то\n\n${prefix}stare - уставиться\n\n${prefix}teehee - подсмеяться\n\n${prefix}tickle - защекотать кого-то\n\n${prefix}kill - убить кого-то`)
            .addField(`🛡Небольшие вспомогательные команды для сервера`,`\n${prefix}dm [сообщение] - Попросить помощи у разработчика бота\n\n${prefix}help admin - открывает справку с коммандами для админов\n\n${prefix}afk - Дайте людям знать что вы отошли от клавиатуры и не можете отвечать`)
            .setTimestamp()

        msg.channel.send({
            embed
        });
    } catch (e) {
        msg.reply(e.message)
    }

    try {
        if (args[0] === "admin") {
            if (msg.author.id != owner) return msg.channel.send(`А вы точно админ?`);
            let embed = new Discord.RichEmbed()
            .setAuthor("Oni","https://cdn.discordapp.com/avatars/539865580413386783/ec83f6cf28ba561d3ae5e45ead945de3.jpg?size=512")
            .setThumbnail("https://i.pinimg.com/originals/3e/89/c7/3e89c78d8a9b971553f2517325d1bc89.gif")
            .setImage("https://data.whicdn.com/images/241497745/original.gif")
            .setFooter("Команду запросили")    
                .setTitle(`Всё для администрации`)
                    .setColor("0x400000")
                    .addField(`${prefix}setstatus <тип> [статус]`, `Изменить статус бота \nТипы: \n1 - Играет \n2 - Слушает \n 3 - Смотрит`)
                    .addField(`${prefix}forcereload`, `Перезагрузить команды, находящиеся в папке commands`)
                    .addField(`${prefix}setup prooves`, `Создать каналы для сохранения доказательства`)
                    .addField(`${prefix}setup reports`, `Создать каналы для получения жалоб`)
                    .addField(`${prefix}setup modercmd [true|false]`, `Включить или выключить команду ${prefix}moder`)
                    .addField(`${prefix}about`, `Выводит полезную информацию о боте`)
                    .setTimestamp()

            msg.channel.send({
                embed
            })
        }
    } catch (e) {
        msg.reply(e.message)
    }
}

module.exports.help = {
    name: "help"
}