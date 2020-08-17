const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	try {
		let cfg = require("./config.json");
		let prefix = cfg.prefix;
		let cMode = cfg.modes.mcmd;
		let modRole = cfg.modRole;
		let owner = cfg.owner;

		//Наличие роли модератора или владение ботом
		if (!(msg.member.roles.some(r => [modRole].includes(r.id)) || msg.author.id === owner)) return msg.reply(`у вас недостаточно прав.`);

		// Проверка на то, включена ли команда
		if (cMode != true) return msg.channel.send(`Данная команда выключена на сервера. \nВключить: \`${prefix}setup modercmd [true|false]\``);

		let mName = msg.member.displayName.toLowerCase();
		// Поиск канала, соответствующего имени отправителя (никнейма на сервере)
		let log = msg.guild.channels.find(ch => ch.name === mName);
		if (!log) return msg.reply(`Текстовый чат \`#${mName}\` не найден. Сообщите об этом Администратору сервера.`);

		let target = args[0];
		if (!target) return msg.channel.send(`Неверный синтаксис команды. \nИспользуйте: \`${prefix}moder <нарушитель> <доказательство> [причина]\`.`);

		let proof = args[1];
		if (!proof) return msg.channel.send(`Неверный синтаксис команды. \nИспользуйте: \`${prefix}moder <нарушитель> <доказательство> [причина]\`.`);

		let reason = args.slice(2).join(" ");
		if (!reason) return msg.channel.send(`Неверный синтаксис команды. \nИспользуйте: \`${prefix}moder <нарушитель> <доказательство> [причина]\`.`);

		let embed = new Discord.RichEmbed()
			.addField(`Модератор`, `<@!${msg.author.id}>`)
			.addField(`Нарушитель`, `${target}`)
			.addField(`Причина`, `${reason}`)
			.addField(`Доказательство`, `${proof}`)
			.setTimestamp()
			.setColor('#7289DA');

		log.send({ embed }).then(() => msg.reply(`доказательства сохранены!`));

		return;

	} catch (e) {
		msg.reply(`произошла непредвиденная ошибка. Сообщите об этом разработчику бота. \nError: ${e.message}`);
	}
}

module.exports.help = {
	name: "moder"
}