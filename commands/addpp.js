const osu = require("../osu.js");
const helper = require("../helper.js");

module.exports = {
	command: "addpp",
	description:
		"Расчитайте новый общий пп после достижения новой наилучшей игры.",
	argsRequired: 1,
	usage: "<количество pp> [ник] [beatmap_id]",
	example: [
		{
			run: "addpp 300",
			result: "Возвращает ваш общий pp с дополнительным счетом 300pp.",
		},
		{
			run: "addpp 300+350",
			result:
				"Возвращает ваш общий pp с дополнительным счетом 300 и 350pp.",
		},
		{
			run: "addpp 1100 Vaxei 1860433",
			result:
				"Возвращает общее количество очков Vaxei, если их оценка по / b / 1860433 присуждается 1100pp.",
		},
	],
	configRequired: ["credentials.osu_api_key"],
	call: (obj) => {
		return new Promise((resolve, reject) => {
			let { argv, msg, user_ign } = obj;

			let pp_to_add = [];
			let acc_to_use = {};
			let pp_to_add_pars = argv[1].split("+");

			pp_to_add_pars.forEach(function (value, index) {
				let acc_to_add_pars = value.split(":");
				if (acc_to_add_pars.length > 1) {
					let acc_to_add = parseFloat(acc_to_add_pars[1]);
					acc_to_use[index] = acc_to_add;
				}
				pp_to_add.push(parseFloat(value));
			});

			let add_to_user;
			let beatmap = "";

			if (argv[2]) {
				if (argv[2].startsWith("<@"))
					argv[2] = argv[2].substr(2).split(">")[0];

				if (argv[2].toLowerCase() in user_ign)
					add_to_user = user_ign[argv[2].toLowerCase()];
				else add_to_user = argv[2];
			} else {
				if (user_ign[msg.author.id] === undefined) {
					reject(helper.commandHelp("ign-set"));
				} else {
					add_to_user = user_ign[msg.author.id];
				}
			}

			if (argv[3]) {
				for (let x = 3; x < argv.length; x++) {
					beatmap += argv[x] + " ";
				}
				beatmap = beatmap.trim();
			}

			let mode = 0;

			if (add_to_user && pp_to_add.length > 0) {
				osu.add_pp(add_to_user, pp_to_add, beatmap, (output) => {
					resolve(output);
				});
			} else {
				reject(helper.commandHelp("addpp"));
			}
		});
	},
};
