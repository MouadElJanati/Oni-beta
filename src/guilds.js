const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {

    let cfg = require("./json/config.json");
    let owner = cfg.owner;

    try {
        if (msg.author.id !== owner) return msg.reply(`not today`).then(() => console.log(`[WARN] ${msg.author.id} tried to use guilds`));

        if (!args[0]) return msg.reply(`вы не указали тип листинга: \`names\`, \`ids\`, \`list\``)
        if (args[0] === "names") {
            let guildNames = bot.guilds.map(g => g.name).join("\n");
            return msg.reply(`**я есть тут:**\`\`\`${guildNames}\`\`\``);
        };

        if (args[0] === "ids") {
            let guildIds = bot.guilds.map(g => g.id).join("\n");
            return msg.reply(`**я есть тут:**\`\`\`${guildIds}\`\`\``);
        };

        if (args[0] === "list") {

            try {
                let guilds = bot.guilds.map(g => [g.name + " (" + g.id + "), на сервере " + g.memberCount + " участников"]).join("\n");
                return msg.channel.send("```python" + "\n" + guilds + "```");
            } catch (e) {
                msg.reply(`${e.message}`)
            }
        }

        if (args[0] === "info") {
            let gID = args[1];
            if (!gID) return msg.reply(`укажите ID сервера.`);

            try {
                let embed = new Discord.RichEmbed()
                    .setAuthor(`${bot.guilds.get(gID).name} - Informations`, bot.guilds.get(gID).iconURL)
                    .setColor('#f4df42')
                    .addField('Server owner', bot.guilds.get(gID).owner, true)
                    .addField('Server region', bot.guilds.get(gID).region, true)
                    .addField('Channel count', bot.guilds.get(gID).channels.size, true)
                    .addField('Total member count', bot.guilds.get(gID).memberCount)
                    .addField('Verification level', bot.guilds.get(gID).verificationLevel, true)
                    .setFooter('Guild created at:')
                    .setTimestamp(bot.guilds.get(gID).createdAt);
                return msg.channel.send({ embed });
            } catch (e) {
                msg.reply(`${e.message}`)
            }
        }

        if (args[0] === "leave") {
            try {
                bot.guilds.get(args[1]).leave()
                    .then(g => {
                        console.log(`[GUILDS] I just left ${g} (${g.id})`)
                        msg.reply(`я покинул сервер \`${g}\``)
                    }
                    ).catch(console.error);
            } catch (e) {
                msg.reply(`${e.message}`);
            }
        }

        if (args[0] === "announce") {
            try {
                let guildID = args[1];
                if (!guildID) return msg.reply(`вы не указали ID сервера, который требуется покинуть`);

                let message = args.slice(2).join(" ");

                try {
                    bot.guilds.get(guildID).channels.find("name", `report-bot-announces`).send(message).then(msg.reply(`message sent!`));
                } catch (e) {
                    msg.reply(`${e.message}`)
                }
            } catch (e) {
                msg.reply(e.message)
            }
        }

        if (args[0] === "announcesetup") {
            let guildID = args[1];
            if (!guildID) return msg.reply(`вы не указали ID сервера, на котором требуется сделать анонс.`);

            try {
                let announceCh = bot.guilds.get(guildID).channels.find(ch => ch.name === `report-bot-announces`);
                if (!announceCh) {
                    bot.guilds.get(guildID).createChannel(`"report-bot-announces"`, 'text', [{
                        id: bot.guilds.get(guildID).defaultRole,
                        deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES'],
                    }]).catch(console.error).then(() => msg.reply(`:ok_hand: настройка завершена.`))
                } else {
                    msg.reply(`announceCh exists in ${guildID} guild.`)
                }
            } catch (e) {
                msg.reply(e.message)
            }
        }
    } catch (e) {
        msg.channel.send(`Ошибка: ` + e.message);
    }
}

module.exports.help = {
    name: "guild"
}