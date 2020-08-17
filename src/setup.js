const Discord = require("discord.js");
let cfg = require("../config.json")
const fs = require('fs');
const ms = require('ms');
var mcMode = JSON.parse(fs.readFileSync("./config.json", "utf8"));


module.exports.run = async (bot, msg, args) => {
    let prefix = cfg.prefix;

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply(`вы не являетесь Администратором данного сервера.`).then(() => console.log(`[WARN] ${msg.author.id} tried to use setup`));

    try {
        if (!args[0]) return msg.channel.send(`Неверный синтаксис команды. \nИспользуйте \`${cfg.prefix}setup [prooves|reports|modercmd]\``)

        if (args[0] === "prooves") {
            try {
                let LogC = msg.guild.channels.find(ch => ch.name === cfg.channels.prooves);
                if (!LogC) {
                    msg.guild.createChannel(cfg.channels.prooves, 'text', [{
                        id: msg.guild.defaultRole,
                        deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES'],
                    }]).catch(console.error).then(() => msg.channel.send(`:ok_hand: настройка завершена.`))
                } else {
                    msg.reply(`вы уже настроили текстовые каналы.`)
                }

            } catch (e) {
                msg.reply(`случилась непредвиденная ошибка. У меня есть права на управление текстовыми каналами? \n${e.message}`);
                console.error();
            }
        }

        if (args[0] === "reports") {
            try {
                let LogC = msg.guild.channels.find(ch => ch.name === cfg.channels.reports);
                if (!LogC) {
                    msg.guild.createChannel(cfg.channels.reports, 'text', [{
                        id: msg.guild.defaultRole,
                        deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES'],
                    }]).catch(console.error).then(() => msg.channel.send(`:ok_hand: настройка завершена.`))
                } else {
                    return msg.reply(`вы уже настроили текстовые каналы.`);
                }

            } catch (e) {
                msg.reply(`случилась непредвиденная ошибка. У меня есть права на управление текстовыми каналами? \n${e.message}`);
                console.error();
            }
        }

        if (args[0] === "modercmd") {
            try {
                if (!args[1]) return msg.channel.send(`Неверный синтаксис команды. \nИспользуй: \`${prefix}setup modercmd [true|false]\``)
                if (!(args[1] == "false" || args[1] == "true")) return msg.reply(`значение может быть только true или false.`);

                if (args[1] === "true")
                    try {
                        cfg["modes"] = {
                            "mcmd": true
                        }

                        fs.writeFile("./config.json", JSON.stringify(cfg), (err) => {
                            if (err) console.log(err);
                        });

                        msg.channel.send(`Команда \`${prefix}moder\` включена.`)
                    } catch (e) {
                        msg.reply(`Ошибка: ` + e.message)
                    }

                if (args[1] === "false")
                    try {
                        cfg["modes"] = {
                            "mcmd": false
                        }

                        fs.writeFile("./config.json", JSON.stringify(cfg), (err) => {
                            if (err) console.log(err);
                        });

                        msg.channel.send(`Команда \`${prefix}moder\` выключена.`)
                    } catch (e) {
                        msg.reply(`Ошибка: ` + e.message)
                    }



                /*if(mcMode[channels.channelsByProoverName] == true && args[1] === "true") return msg.reply(`true already`);
                if(mcMode[channels.channelsByProoverName] == false && args[1] === "false") return msg.reply(`false already`);*/

            } catch (e) {
                msg.reply(`Ошибка: ` + e.message)
            }
        }
    } catch (e) {
        msg.reply(e.message)
    }
}

module.exports.help = {
    name: "setup"
}