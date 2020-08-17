const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
    let cfg = require("./config.json")

    try {
        let letter = args.join(" ");
        if (!letter) return msg.reply(`Эмм... Лучше не баловаться, с, этим...`)
        bot.guilds.get("552908722868060170").channels.get(cfg.DMchannel).send(`**HELP**\`\`\`${letter}\`\`\` \n**Отправитель:** ${msg.author.username}#${msg.author.discriminator} (\`${msg.author.id}\`) \n**Сервер:** ${msg.guild.id}`)
            .then(() => msg.reply(`ваше сообщение было доставлено Администраторам сервера.`))
    } catch (e) {
        return msg.reply(e.message)
    }
}

module.exports.help = {
    name: "dm"
}
