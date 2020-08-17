const axios = require("axios");
const helper = require("../helper.js");
const config = require("../config.json");
const FLOWA_MAX = 1000;
var Discord = require("discord.js");
const pexels_api = axios.create({
	baseURL: "https://api.pexels.com/v1/",
});

module.exports = {
	command: "flowa",
	description:
		"Show a random flower picture. Images from <https://pexels.com/>.",
	usage: "[optional tags separated by space]",
	example: {
		run: "flowa sakura tree",
		result: "Returns a random picture of a sakura tree.",
	},
	configRequired: ["credentials.pexels_key"],
	call: (obj) => {
		return new Promise((resolve, reject) => {
			let { argv } = obj;
			let query = "flower nature";
			let max = FLOWA_MAX;

			if (argv.length > 1) {
				query += " " + argv.slice(1).join(" ");
				max = 50;
			}

			pexels_api
				.get("search", {
					params: {
						query: query,
						per_page: 1,
						page: helper.getRandomInt(1, max),
					},
					headers: {
						Authorization: config.credentials.pexels_key,
					},
				})
				.then((response) => {
					let photos = response.data.photos;
					const embed = new Discord.RichEmbed()
						.setTitle("Flowa🌸")
						.setColor(0xe0e0e0) ///0x00ff40 (ok) | 0xff3e3e(fail)//////
						.setImage(response.data.photos[0].src.original);
					if (photos.length == 0) reject("No results");
					else resolve(embed);
				})
				.catch((err) => {
					helper.error(err);
					reject("Couldn't connect to Pexels API");
				});
		});
	},
};
