const osu = require("../osu.js");
const helper = require("../helper.js");

module.exports = {
	command: "ar",
	description:
		"Рассчитать значения скорости и миллисекунды с примененными модами.",
	argsRequired: 1,
	usage: "<ar> [+mods]",
	example: {
		run: "ar 8 +DT",
		result: "Возвращает AR AR8 с примененным DT.",
	},
	call: (obj) => {
		return new Promise((resolve, reject) => {
			let { argv } = obj;

			let ar = parseFloat(argv[1]);
			let mods = argv.length > 2 ? argv[2].toUpperCase() : "";
			resolve(osu.calculate_ar(ar, mods));
		});
	},
};
