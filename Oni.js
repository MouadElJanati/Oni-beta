const Eris = require("eris");
const winston = require("winston");
const Client = require("nekos.life");
const messages = require("./assets/messages.json");
const help = require("./assets/help.json");
const pkg = require("./package.json");
const config = require("./config.json");
const { prefix, token } = require("./config.json");
const jokes = require("./assets/jokes.json");
const catfacts = require("./assets/catfacts.json");
const rpsData = require("./assets/rps.json");
const urlHelper = require("url");
const fetch = require("node-fetch");
const ball = require("./assets/8ball.json");
const fs = require("fs");
const configrole = require("./configrole.json");
var moment = require("moment");
var Discord = require("discord.js");
var logStamp = Date.now();
var role = new Discord.Client();
var load = require("./src/load");
var track = require("./src/track");

load(role, configrole);
track(role, configrole);

role.on("ready", () => {
	const embed = new Discord.RichEmbed()
		.setTitle("Загрузка...")
		.setAuthor("Oni💎 Запуск бота...", role.user.avatarURL)
		.setColor(0xe0e0e0) ///0x00ff40 (ok) | 0xff3e3e(fail)//////
		.setDescription("Начало запуска:" + moment().format("h:mm:ss a"))
		.setFooter("Oni💎")
		.setThumbnail("https://i.gifer.com/VdOY.gif");
	role.channels.get(config.outputChannelId).send(embed);
}); ////////////////

let afk = require("./src/json/afk.json");
role.on("message", (message) => {
	if (message.content === "*afk") {
		message.delete();
		console.log(message.author.username + " " + "afk");
		const embed = new Discord.RichEmbed()
			.setAuthor(message.author.username, message.author.avatarURL)
			.setTitle("AFK💤")
			.setColor(16684873)
			.setDescription(
				message.author.username + " " + "отошёл(ла) от клавиатуры"
			)
			.setThumbnail(
				afk.image[Math.floor(Math.random() * afk.image.length)]
			);
		message.channel.send(embed);
	}
});
/*
role.on("message", (message) => {
	if (message.content === "*update") {
		message.delete();
		const embed = new Discord.RichEmbed()
			.setAuthor("Обновление", role.user.avatarURL)
			.setTitle("Патч 2.7")
			.setColor(0xe0fffd)
			.setDescription(
				"В патч входит:\n - Обновлённый интерфейс для консоли\n - Переработка всех команд под эмбед(то есть все команды теперь отображаются красивенько, даже команда `*flowa`)  \n - Добавлена русская локализация для некоторых команд\n - идёт переработка музыкального модуля"
			)
			.setThumbnail(
				"https://mir-s3-cdn-cf.behance.net/project_modules/disp/ccb15d13765711.56277de03b749.gif"
			)
			.setFooter("Oni💎");
		message.channel.send(embed);
	}
});
*/
role.on("message", (message) => {
	if (message.content === "@everyone") {
		message.delete();
		console.log(message.author.username + " " + "everyone warn");
		const embed = new Discord.RichEmbed()
			.setTitle("Не делайте этого!")
			.setThumbnail(message.author.avatarURL)
			.setDescription(
				message.author +
					"Некоторые участники не любят всеобщих упоминаний!"
			)
			.setAuthor(
				"Внимание⚠",
				"https://cdn.dribbble.com/users/6063/screenshots/6237941/_.gif"
			)
			.setColor(0xff7248);
		message.channel.send(embed);
	}
});

///////////////////////////////////////////////////////////////////////
role.on("message", (message) => {
	if (message.content === "@here") {
		message.delete();
		console.log(message.author.username + " " + "here warn");
		const embed = new Discord.RichEmbed()
			.setTitle("Не делайте этого!")
			.setThumbnail(message.author.avatarURL)
			.setDescription(
				message.author +
					"Некоторые участники негативно реагируют на всеобщие упоминания!"
			)
			.setAuthor(
				"Внимание⚠",
				"https://cdn.dribbble.com/users/6063/screenshots/6237941/_.gif"
			)
			.setColor(0xff7248);
		message.channel.send(embed);
	}
});
const path = require("path");
const objectPath = require("object-path");
const chalk = require("chalk");

const osu = require("./osu.js");
const helper = require("./helper.js");
role.on("error", helper.error);

let user_ign = {};

if (helper.getItem("user_ign")) {
	user_ign = JSON.parse(helper.getItem("user_ign"));
} else {
	helper.setItem("user_ign", JSON.stringify(user_ign));
}

let last_beatmap = {};

if (helper.getItem("last_beatmap")) {
	last_beatmap = JSON.parse(helper.getItem("last_beatmap"));
} else {
	helper.setItem("last_beatmap", JSON.stringify(last_beatmap));
}

let last_message = {};

if (helper.getItem("last_message")) {
	last_message = JSON.parse(helper.getItem("last_message"));
} else {
	helper.setItem("last_message", JSON.stringify(last_message));
}

if (config.credentials.osu_api_key && config.credentials.osu_api_key.length > 0)
	osu.init(role, config.credentials.osu_api_key, last_beatmap);

function checkCommand(msg, command) {
	if (!msg.content.startsWith(config.prefix)) return false;

	if (msg.author.bot) return false;

	let argv = msg.content.split(" ");

	let command_match = false;

	let msg_check = msg.content
		.toLowerCase()
		.substr(config.prefix.length)
		.trim();

	let commands = command.command;

	let startswith = false;

	if (command.startsWith) startswith = true;

	if (!Array.isArray(commands)) commands = [commands];

	for (let i = 0; i < commands.length; i++) {
		let command_check = commands[i].toLowerCase().trim();
		if (startswith) {
			if (msg_check.startsWith(command_check)) command_match = true;
		} else {
			if (
				msg_check.startsWith(command_check + " ") ||
				msg_check == command_check
			)
				command_match = true;
		}
	}

	if (command_match) {
		let hasPermission = true;

		if (command.permsRequired)
			hasPermission =
				command.permsRequired.length == 0 ||
				command.permsRequired.some((perm) =>
					msg.member.hasPermission(perm)
				);

		if (!hasPermission)
			return "Insufficient permissions for running this command.";

		if (
			command.argsRequired !== undefined &&
			argv.length <= command.argsRequired
		)
			return helper.commandHelp(command.command);

		return true;
	}

	return false;
}

let commands = [];
let commands_path = path.resolve(__dirname, "commands");

fs.readdir(commands_path, (err, items) => {
	if (err) throw "Unable to read commands folder";

	items.forEach((item) => {
		if (path.extname(item) == ".js") {
			let command = require(path.resolve(commands_path, item));

			command.filename = path.resolve(commands_path, item);

			let available = true;
			let unavailability_reason = [];

			if (
				command.folderRequired !== undefined &&
				command.folderRequired.length > 0
			) {
				let { folderRequired } = command;

				if (!Array.isArray(command.folderRequired))
					folderRequired = [folderRequired];

				folderRequired.forEach((folder) => {
					if (!fs.existsSync(path.resolve(__dirname, folder)))
						available = false;
					unavailability_reason.push(
						`required folder ${folder} does not exist`
					);
				});
			}

			if (
				command.configRequired !== undefined &&
				command.configRequired.length > 0
			) {
				let { configRequired } = command;

				if (!Array.isArray(command.configRequired))
					configRequired = [configRequired];

				configRequired.forEach((config_path) => {
					if (!objectPath.has(config, config_path)) {
						available = false;
						unavailability_reason.push(
							`required config option ${config_path} not set`
						);
					} else if (
						objectPath.get(config, config_path).length == 0
					) {
						available = false;
						unavailability_reason.push(
							`required config option ${config_path} is empty`
						);
					}
				});
			}

			if (
				command.emoteRequired !== undefined &&
				command.emoteRequired.length > 0
			) {
				let { emoteRequired } = command;

				if (!Array.isArray(command.emoteRequired))
					emoteRequired = [emoteRequired];

				emoteRequired.forEach((emote_name) => {
					let emote = helper.emote(emote_name, null, role);
					if (!emote) {
						available = false;
						unavailability_reason.push(
							`required emote ${emote_name} is missing`
						);
					}
				});
			}

			if (available) {
				commands.push(command);
			} else {
				if (!Array.isArray(command.command))
					command.command = [command.command];

				console.log("");
				console.log(
					chalk.yellow(
						`${config.prefix}${command.command[0]} was not enabled:`
					)
				);
				unavailability_reason.forEach((reason) => {
					console.log(chalk.yellow(reason));
				});
			}
		}
	});

	helper.init(commands);
});

let handlers = [];
let handlers_path = path.resolve(__dirname, "handlers");

fs.readdir(handlers_path, (err, items) => {
	if (err) throw "Unable to read handlers folder";

	items.forEach((item) => {
		if (path.extname(item) == ".js") {
			let handler = require(path.resolve(handlers_path, item));
			handlers.push(handler);
		}
	});
});

function onMessage(msg) {
	let argv = msg.content.split(" ");

	argv[0] = argv[0].substr(config.prefix.length);

	/*if (config.debug) helper.log(msg.author.username, ":", msg.content);*/

	commands.forEach((command) => {
		let check_command = checkCommand(msg, command);

		if (check_command === true) {
			if (command.call && typeof command.call === "function") {
				let promise = command.call({
					msg,
					argv,
					role,
					user_ign,
					last_beatmap,
					last_message,
				});

				Promise.resolve(promise)
					.then((response) => {
						if (response) {
							let message_promise,
								edit_promise,
								replace_promise,
								remove_path,
								content;

							if (
								typeof response === "object" &&
								"edit_promise" in response
							) {
								({ edit_promise } = response);
								delete response.edit_promise;
							}

							if (
								typeof response === "object" &&
								"replace_promise" in response
							) {
								({ replace_promise } = response);
								delete response.replace_promise;
							}

							if (
								typeof response === "object" &&
								"remove_path" in response
							) {
								({ remove_path } = response);
								delete response.remove_path;
							}

							if (
								typeof response === "object" &&
								"content" in response
							) {
								({ content } = response);
								delete response.content;
							}

							if (content)
								message_promise = msg.channel.send(
									content,
									response
								);
							else message_promise = msg.channel.send(response);

							message_promise.catch((err) => {
								msg.channel.send(
									`Couldn't run command: \`${err}\``
								);
							});

							Promise.all([
								message_promise,
								edit_promise,
								replace_promise,
							])
								.then((responses) => {
									let message = responses[0];
									let edit_promise = responses[1];
									let replace_promise = responses[2];

									if (edit_promise)
										message
											.edit(edit_promise)
											.catch(helper.error);

									if (replace_promise) {
										msg.channel
											.send(replace_promise)
											.catch((err) => {
												msg.channel.send(
													`Couldn't run command: \`${err}\``
												);
											})
											.finally(() => {
												message.delete();

												if (
													typeof replace_promise ===
														"object" &&
													"remove_path" in
														replace_promise
												) {
													({
														remove_path,
													} = replace_promise);
													delete replace_promise.remove_path;
												}

												if (remove_path)
													fs.remove(
														remove_path,
														(err) => {
															if (err)
																helper.error;
														}
													);
											});
									}

									if (remove_path)
										fs.remove(remove_path, (err) => {
											if (err) helper.error;
										});
								})
								.catch((err) => {
									msg.channel.send(
										`Couldn't run command: \`${err}\``
									);
								});
						}
					})
					.catch((err) => {
						if (typeof err === "object") msg.channel.send(err);
						else
							msg.channel.send(
								`Couldn't run command: \`${err}\``
							);

						helper.error(err);
					});
			}
		} else if (check_command !== false) {
			msg.channel.send(check_command);
		}
	});

	handlers.forEach((handler) => {
		if (handler.message && typeof handler.message === "function") {
			handler.message({
				msg,
				argv,
				role,
				user_ign,
				last_beatmap,
				last_message,
			});
		}
	});
}

role.on("message", onMessage);

role.on("ready", () => {
	helper.log("info: Osu модуль запущен");
	if (config.credentials.discord_role_id)
		helper.log(
			`Инвайт бота: ${chalk.blueBright(
				"https://discordapp.com/api/oauth2/authorize?role_id=" +
					config.credentials.discord_role_id +
					"&permissions=8&scope=bot"
			)}`
		);
}); //////////////////////

role.on("message", (message) => {
	if (message.content === "*status") {
		message.delete();
		console.log(message.author.username + " " + "status used");
		const embed = new Discord.RichEmbed()
			.setAuthor(message.author.username, message.author.avatarURL)
			.setTitle("Использование ресурсов подмодулями бота📈")
			.setColor(16684873)
			.addField(
				`**RAM**`,
				Math.round(process.memoryUsage().rss / 1024 / 1024) + "MB"
			)
			.addField(
				`**ROM**`,
				Math.round(process.memoryUsage().heapUsed / 1024 / 1024) +
					"** MB / **" +
					Math.round(process.memoryUsage().heapTotal / 1024 / 1024) +
					"MB"
			)
			.setThumbnail(
				"https://i.pinimg.com/originals/f8/8a/ca/f88acab7ffd127b4465659500aa0538f.gif"
			)
			.setFooter("Modules💎");
		message.channel.send(embed);
	}
});

function formatConsoleMessage(message) {
	return message.cleanContent.replace(new RegExp("\n", "g"), "\n\t");
}
const CHANNEL = "logs◤💻◢";
role.on("message", function (message) {
	if (message.author.id != role.user.id) {
		if (message.channel.type == "text")
			console.log(
				"[" +
					message.guild.name +
					"][#" +
					message.channel.name +
					"][MSG] " +
					message.author.username +
					"#" +
					message.author.discriminator +
					": " +
					formatConsoleMessage(message)
			);
		else if (message.channel.type == "dm")
			message.channel.sendMessage(
				"Ой-ой. Кажется я не могу отвечать на ваши сообщения в ЛС. Попробуйте меня добавить на Ваш " +
					"сервер!\nhttps://discordapp.com/oauth2/authorize?&client_id=539865580413386783&scope=bot&permissions=8"
			);
		else if (message.channel.type == "group")
			message.channel.sendMessage(
				"Ой-ой. Кажется я не могу отвечать на ваши сообщения в группе. Попробуйте меня добавить на Ваш сервер\n" +
					"https://discordapp.com/oauth2/authorize?&client_id=539865580413386783&scope=bot&permissions=8"
			);
	}
});

role.login(config.token);

// Configure logger settings
const logger = winston.createLogger({
	level: "debug",
	format: winston.format.json(),
	transports: [
		// - All log: ./logs/full/${timestamp}.log
		// - Error log: ./logs/error/${timestamp}.log
		new winston.transports.File({
			filename: "logs/error/" + logStamp + ".log",
			level: "error",
		}),
		new winston.transports.File({
			filename: "logs/full/" + logStamp + ".log",
			level: "silly",
		}),
	],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple(),
		})
	);
}

// Initialize Eris object
var bot = new Eris.CommandClient(
	config.token,
	{
		defaultImageSize: 512,
		autoreconnect: true,
		defaultImageFormat: "jpg",
		maxShards: config.shardCount,
	},
	{
		defaultHelpCommand: false,
		description: "Привет! Я Oni, многофункциональный дискорд бот!",
		name: "Oni",
		owner: "/TSlash",
		prefix: "*",
	}
);

var neko = new Client();

var playingStatusUpdater;
var uptimeH = 0;
var uptimeM = 0;
var uptimeS = 0;
var musicGuilds = new Map();

moment.locale("ru");
let times = moment().format("h:mm:ss a");

bot.connect();

process.on(
	"uncaughtException",
	(err) => {
		// When an exception occurs...
		logger.error("Caught exception: " + err.message); // Log exception message...
		logger.info("Stack trace: " + err.stack); // ..and stack trace to console using winston...
		bot.createMessage(config.outputChannelId, {
			embed: {
				title: ":warning: /TSlash! Что то пошло не так!",
				description:
					"\n:speech_balloon: Message: " +
					err.message +
					"\n:information_source: Stack Trace:\n```" +
					err.stack +
					"```",
				color: 0xca2121,
				thumbnail: {
					url:
						"https://i.pinimg.com/originals/4c/22/18/4c2218f5cc96ba76c0e590cd1dadb1bc.gif",
				},
				author: {
					name: "Oni💎 ⚠Ошибка!",
					icon_url: "https://i.gifer.com/76cI.gif",
				},
			},
		}); // Send a "You don't have the permission to perform this action" message.
	} // ...and send a message to my log channel.
);

process.on(
	"unhandledRejection",
	(err, p) => {
		// When an promise rejection occurs...
		logger.error("Caught exception: " + err.message); // Log exception message...
		logger.info("Stack trace: " + err.stack); // ..and stack trace to console using winston...
		bot.createMessage(config.outputChannelId, {
			embed: {
				title: ":warning: /TSlash! Что то пошло не так!",
				description:
					"\n:speech_balloon: Message: " +
					err.message +
					"\n:information_source: Stack Trace:\n```" +
					err.stack +
					"```",
				color: 0xca2121,
				thumbnail: {
					url:
						"https://i.pinimg.com/originals/4c/22/18/4c2218f5cc96ba76c0e590cd1dadb1bc.gif",
				},
				author: {
					name: "Oni💎 ⚠Ошибка!",
					icon_url: "https://i.gifer.com/76cI.gif",
				},
			},
		}); // Send a "You don't have the permission to perform this action" message.
	} // ...and send a message to my log channel.
);

bot.on(
	"error",
	(err, id) => {
		// When an exception occurs...
		logger.error(
			"Caught exception: " + err.message + " from shard # " + id
		); // Log exception message and Shard ID...
		logger.info("Stack trace: " + err.stack); // ..and stack trace to console using winston...
		bot.createMessage(config.outputChannelId, {
			embed: {
				title: ":warning: /TSlash! Что то пошло не так!",
				description:
					id +
					"!\n:speech_balloon: Message: " +
					err.message +
					"\n:information_source: Stack Trace:\n```" +
					err.stack +
					"```",
				color: 0xca2121,
				thumbnail: {
					url:
						"https://i.pinimg.com/originals/4c/22/18/4c2218f5cc96ba76c0e590cd1dadb1bc.gif",
				},
				author: {
					name: "Oni💎 ⚠Ошибка!",
					icon_url: "https://i.gifer.com/76cI.gif",
				},
			},
		}); // Send a "You don't have the permission to perform this action" message.
	} // ...and send a message to my log channel.
); // ...and send a message to my log channel.

function logInfo(message) {
	// Alter log function
	logger.info(message); // Log message to winston...
	bot.createMessage(config.outputChannelId, {
		embed: {
			title: ":information_source: В процессе!",
			description: message,
			color: 0xe3dede,
			thumbnail: {
				url:
					"https://miro.medium.com/max/1600/1*e_Loq49BI4WmN7o9ItTADg.gif",
			},
			author: {
				name: "Oni💎 Оповещение о загрузке!",
				icon_url: bot.user.avatarURL,
			},
		},
	});
}

function logError(err, shardId) {
	// Alter error function
	logger.error(
		"Caught exception: " + err.message + " from shard # " + shardId
	); // Log exception message and Shard ID...
	logger.info("Stack trace: " + err.stack); // ..and stack trace to console using winston...
	bot.createMessage(config.outputChannelId, {
		embed: {
			title: ":warning: /TSlash! Что то пошло не так!",
			description:
				shardId +
				"!\n:speech_balloon: Message: " +
				err.message +
				"\n:information_source: Stack Trace:\n```" +
				err.stack +
				"```",
			color: 0xca2121,
			thumbnail: {
				url:
					"https://i.pinimg.com/originals/4c/22/18/4c2218f5cc96ba76c0e590cd1dadb1bc.gif",
			},
			author: {
				name: "Oni💎 ⚠Ошибка!",
				icon_url: bot.user.avatarURL,
			},
		},
	});
}

process.on("SIGINT", function () {
	// CTRL+C / Kill process event
	logInfo("Shutting down.");
	bot.disconnect();
	clearTimeout(playingStatusUpdater);
	logger.info("Shut down.");
	process.exit();
});

function getUserName(member) {
	if (member.nick === null) {
		return member.username;
	} else {
		return member.nick;
	}
}

async function chat(channelId, message) {
	var chat =
		messages.mention[Math.floor(Math.random() * messages.mention.length)];
	bot.createMessage(channelId, ":speech_balloon: " + chat); // Send a message with the response
}

function noPermission(message, user, command) {
	// A function to call whenever a user tries to do something which they don't have permission to do
	bot.createMessage(message.channel.id, {
		embed: {
			title: "Нету разрешения!",
			description: messages.noperm
				.replace("$user", user.mention)
				.replace("$command", command),
			color: 16684873,
			thumbnail: {
				url: user.avatarURL,
			},
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
		},
	}); // Send a "You don't have the permission to perform this action" message.
}

function invalidArgs(message, user, command) {
	// A fuction that tells the user that he used the command incorrectly
	bot.createMessage(message.channel.id, {
		embed: {
			title: "Неправильное использование команды!",
			description: messages.wrongargs
				.replace("$user", user.mention)
				.replace("$command", command.replace("*", "")),
			color: 16684873,
			thumbnail: {
				url: user.avatarURL,
			},
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
		},
	});
	message.delete(); // Send an "Invalid arguments" message.
}

function subCommandRequired(message, user, command) {
	// A function to tell the user that they should specify a subcommand
	bot.createMessage(message.channel.id, {
		embed: {
			title: "Неправильное использование команды!",
			description: messages.subcmd
				.replace("$user", user.mention)
				.replace("$command", command.replace("*", "")),
			color: 16684873,
			thumbnail: {
				url: user.avatarURL,
			},
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
		},
	});
	message.delete(); // Send an "Subcommand required" message.
}

function notNSFW(message, user, command) {
	// A function to call whenever a user tries to do something which they don't have permission to do
	bot.createMessage(message.channel.id, {
		embed: {
			title: "⚠Это не NSFW канал!",
			description: messages.notnsfw
				.replace("$user", user.mention)
				.replace("$command", command),
			color: 16684873,
			thumbnail: {
				url: user.avatarURL,
			},
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
		},
	}); // Send a "You don't have the permission to perform this action" message.
}
bot.on("message", (message) => {
	if (message.content === "test") {
		const embed = new RichEmbed()

			.setTitle("Не делайте этого!")
			.setThumbnail(user.avatarURL)
			.setDescription(user.mention + "Не нарушайте правила!")
			.setAuthor("Oni");

		message.channel.send(embed);
	}
});

// Send a "Please don't use @everyone/@here" message.

function refreshUptime() {
	// A function to refresh the uptime variables
	uptimeH = Math.floor(bot.uptime / 60 / 60 / 1000);
	uptimeM = Math.floor((bot.uptime / 60 / 1000) % 60);
	uptimeS = Math.floor((bot.uptime / 1000) % 60);
}

function weebShHint(user, channelId, command) {
	bot.createMessage(channelId, {
		embed: {
			title: "В разработке!",
			description: messages.weebShHint
				.replace("$user", user.mention)
				.replace("$command", command),
			color: 16684873,
			thumbnail: {
				url: user.avatarURL,
			},
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
		},
	}); // Inform the user about my missing permission to access the Weeb.sh API.
}

bot.on("ready", () => {
	// When the bot is ready
	logInfo("Запущен процесс подключения к Discord API!"); // Log "Ready!" and some information
	logInfo("Бот: " + bot.user.username); // User name
	logInfo("ID записи времени: " + bot.startTime); // Start time as timestamp
	logInfo("ID записи логов: " + logStamp); // Log file timstamp
	logInfo("Настройка информации!"); // "Setting information"
	bot.createMessage(config.outputChannelId, {
		embed: {
			title: "Количество ошибок:**0**",
			description: "Время запуска:" + moment().format("h:mm:ss a"),
			color: 0x00ff40, ///0x00ff40 (ok) | 0xff3e3e(fail)//////
			author: {
				name: "Oni💎 Успешно запущена",
				icon_url: bot.user.avatarURL,
			},
			thumbnail: {
				url:
					"https://cdn.dribbble.com/users/108183/screenshots/3992995/loader-3d_i_.gif",
			},
			footer: {
				text: "Oni💎",
			},
		},
	});
	/////////////////////////////////////////////////

	var playMsgId = Math.floor(Math.random() * messages.playing.length); // Generate a random number
	var playMsg = messages.playing[playMsgId];
	bot.editStatus("dnd", {
		// Set status
		name: playMsg + " " + "| *help",
		type: 0,
		url:
			"https://discordapp.com/oauth2/authorize?client_id=539865580413386783&scope=bot&permissions=8",
	});
	playingStatusUpdater = setInterval(function () {
		// Change status every minute
		var playMsgId = Math.floor(Math.random() * messages.playing.length); // Generate a random number
		var playMsg = messages.playing[playMsgId];
		bot.editStatus("dnd", {
			// Set status
			name: playMsg + " " + "| *help",
			type: 0,
			url:
				"https://discordapp.com/oauth2/authorize?client_id=539865580413386783&scope=bot&permissions=8",
		});
	}, 60000);
	logInfo("Всё настроено! Сейчас я запущена и работаю без ошибок!");
});

bot.registerCommand(
	"reboot",
	(message, args) => {
		if (args.length === 0) {
			if (message.author.id === config.ownerId) {
				logInfo("Перезагружаем♻.");
				bot.disconnect();
				role.destroy();
				clearTimeout(playingStatusUpdater);
				logger.info("Работа бота завершена.");
				bot.connect(config.token);
				role.login(config.token);
			} else {
				noPermission(
					message,
					message.author,
					message.content.split(" ")[0]
				);
			}
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 45000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 3,
	}
);

bot.registerCommand(
	"shutdown",
	(message, args) => {
		if (args.length === 0) {
			if (message.author.id === config.ownerId) {
				let ts = bot.createMessage(message.channel.id, {
					embed: {
						title: "Отключение Oni💎",
						description: "Отключаюсь от API🔌",
						color: 0x20d994,
						thumbnail: {
							url:
								"https://data.whicdn.com/images/297107442/original.gif?t=1505360828",
						},
						author: {
							name: "Oni",
							icon_url: bot.user.avatarURL,
						},
					},
				});

				bot.disconnect();
				clearTimeout(playingStatusUpdater);
				logger.info("Работа бота завершена.");
				role.destroy();
				function sleep(ms) {
					return new Promise((resolve) => setTimeout(resolve, ms));
				}
				sleep(4000).then(() => {
					process.exit();
				});
			} else {
				noPermission(
					message,
					message.author,
					message.content.split(" ")[0]
				);
			}
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 45000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 3,
	}
);

bot.registerCommand(
	"servers",
	(message, args) => {
		// Displays every server Tomoko is in.
		if (args.length === 0) {
			if (message.author.id === config.ownerId) {
				logInfo("Кто то запросил список подключенных серверов.");
				var guild = message.member.guild;
				var servers = "";
				bot.guilds.forEach((value, key, map) => {
					servers += value.name + "\n";
				});

				if (servers.length >= 1920) {
					var msgCount = Math.ceil(servers.length / 1920);
					var messages = [];
					let j = 0;
					for (let g = 0; g < msgCount - 1; g++, j += 1920) {
						bot.createMessage(message.channel.id, {
							embed: {
								title: "Подключённые к Oni💎 сервера",
								description:
									"Сервера (Страница " +
									(g + 1) +
									" из " +
									msgCount +
									")\n" +
									servers.substr(j, 1920),
								color: 16684873,
								thumbnail: {
									url: bot.user.avatarURL,
								},
								author: {
									name: "Oni",
									icon_url: bot.user.avatarURL,
								},
							},
						});
					}
					bot.createMessage(message.channel.id, {
						embed: {
							title: "Подключённые к Oni💎 сервера",
							description:
								"Сервера (Страница " +
								msgCount +
								" из " +
								msgCount +
								"):\n" +
								servers.substr(j),
							color: 16684873,
							thumbnail: {
								url: bot.user.avatarURL,
							},
							author: {
								name: "Oni",
								icon_url: bot.user.avatarURL,
							},
						},
					});
				} else {
					bot.createMessage(message.channel.id, {
						embed: {
							title: "Подключённые к Oni💎 сервера",
							description: "Сервера:\n" + servers,
							color: 16684873,
							thumbnail: {
								url: bot.user.avatarURL,
							},
							author: {
								name: "Oni",
								icon_url: bot.user.avatarURL,
							},
						},
					});
				}
			} else {
				noPermission(
					message,
					message.author,
					message.content.split(" ")[0]
				);
			}
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 30000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 3,
	}
);

bot.registerCommand(
	"addfriend",
	(message, args) => {
		// Command to reboot Tomoko
		if (args.length === 1) {
			if (message.author.id === config.ownerId) {
				logInfo(
					"Запрос добавления в друзья отправлен в <@!" +
						args[0] +
						"> ."
				);
				bot.addRelationship(args[0], false);
			} else {
				noPermission(
					message,
					message.author,
					message.content.split(" ")[0]
				);
			}
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 12000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 3,
	}
);

bot.registerCommand(
	"testperm",
	(message, args) => {
		// Command to test the noperm and the invalid args message.
		if (args.length === 0) {
			noPermission(
				message,
				message.author,
				message.content.split(" ")[0]
			);
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 5000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

bot.registerCommand(
	"status",
	(message, args) => {
		if (args.length === 0) {
			refreshUptime(); // Refresh the Uptime variables
			var guildsInCurrentShard = 0;
			bot.guilds.forEach((guild) => {
				// Calcutale guild count for message author's shard
				if (guild.shard.id === message.member.guild.shard.id) {
					guildsInCurrentShard++;
				}
			});
			var musicStatus = "**not playing** any music.";
			if (musicGuilds.has(message.member.guild.id)) {
				musicStatus =
					"playing **" +
					musicGuilds.get(message.member.guild.id).queue[0].title +
					"**.";
			}
			bot.createMessage(message.channel.id, {
				embed: {
					title: "Oni Status💎",
					description:
						"О-оу, хотите узнать что сейчас со мной?\nН-ну как видите я жива, вот некоторая информация:",
					color: 16684873,
					footer: {
						icon_url: message.author.avatarURL,
						text: "Запросил: " + getUserName(message.member),
					},
					thumbnail: {
						url:
							"https://i.pinimg.com/originals/2e/e6/99/2ee6998e34c3e2eff7b894c66cfc5267.jpg",
					},
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					fields: [
						{
							name: ":clock3: Время в онлайне",
							value:
								"**" +
								uptimeH +
								"** часов, **" +
								uptimeM +
								"** минут и**" +
								uptimeS +
								"** секунд.",
						},
						{
							name: ":desktop: Версия последнего патча",
							value:
								"Сейчас я на **Версии " + pkg.version + "**.",
						},
						{
							name: ":earth_africa: Глобальная статистика",
							value:
								"Сервера: **" +
								bot.guilds.size +
								"**\nОсколки: **" +
								bot.shards.size +
								"**\nПользователи: **" +
								bot.users.size +
								"**",
							inline: true,
						},
						{
							name:
								":diamond_shape_with_a_dot_inside: Логирование серверов",
							value:
								"Сервера: **" +
								guildsInCurrentShard +
								"**\nID: **" +
								message.member.guild.shard.id +
								"**\nЮзеры: **" +
								message.member.guild.members.size +
								"**",
							inline: true,
						},
						{
							name: ":speaker: Музыкальный модуль",
							value: "Патч 0.2.7 (работает исправно и без лагов)",
						},
						{
							name: ":floppy_disk: RAM использование",
							value:
								"**" +
								Math.round(
									process.memoryUsage().rss / 1024 / 1024
								) +
								"** MB",
							inline: true,
						},
						{
							name:
								":floppy_disk: Использование физической памяти",
							value:
								"**" +
								Math.round(
									process.memoryUsage().heapUsed / 1024 / 1024
								) +
								"** MB / **" +
								Math.round(
									process.memoryUsage().heapTotal /
										1024 /
										1024
								) +
								"** MB",
							inline: true,
						},
						{
							name: ":thumbsup: Нравится?",
							value:
								"Если вам нравится поддержите разработчика обычным спасибо в ЛС.",
						},
						{
							name: ":handshake: Поддержка",
							value:
								"Если нужна поддержка, пожайлуста присоеденитесь [Сервер поддержки](https://discord.gg/3E64taU)",
						},
					],
				},
			});
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 5000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

bot.registerCommand(
	"avatar",
	(message, args) => {
		// Command to get the avatar of an user
		if (args.length === 1) {
			if (message.mentionEveryone) {
				warnEveryone(
					message,
					message.author,
					message.content.split(" ")[0]
				);
				return;
			}
			if (message.mentions.length === 1) {
				bot.createMessage(message.channel.id, {
					embed: {
						title:
							"Аватарка пользователя " +
							message.mentions[0].username +
							":",
						description:
							"[URL аватарки](" +
							message.mentions[0].avatarURL +
							")",
						color: 16684873,
						author: {
							name: "Oni",
							icon_url: bot.user.avatarURL,
						},
						image: {
							url: message.mentions[0].avatarURL,
						},
						footer: {
							icon_url: message.author.avatarURL,
							text: "Попросил: " + getUserName(message.member),
						},
					},
				}); // Send a message with the avatar as embed.
			} else {
				invalidArgs(
					message,
					message.author,
					message.content.split(" ")[0]
				);
				return;
			}
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
			return;
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);
/////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
bot.registerCommand(
	"help",
	(message, args) => {
		// Help command
		if (args.length === 0) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: help.help.title,
					description: help.help.description,
					color: 16684873,
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					thumbnail: {
						url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text:
							"💎[152] команды в [9] модулях, запросил: " +
							getUserName(message.member),
					},
					fields: help.help.fields,
				},
			});
			message.delete();
		} else if (args.length === 1) {
			if (!help.commandsWithHelp.includes(args[0])) {
				bot.createMessage(message.channel.id, {
					embed: {
						title: "П-помощь не доступна!",
						description:
							"Помощь для команды `" +
							args[0] +
							"` не н-найдена :(\nЕсли Вы увидели это сообщение и считаете что это ошибка обратитесь к разработчику!",
						color: 16684873,
						author: {
							name: "Oni",
							icon_url: bot.user.avatarURL,
						},
						thumbnail: {
							url:
								"https://cdn.discordapp.com/attachments/612737885438869521/668519742381752331/onierror.jpg",
						},
						footer: {
							icon_url: message.author.avatarURL,
							text: "Запросил: " + getUserName(message.member),
						},
					},
				}); // Send a "no help aviable" message.
				message.delete();
				return;
			}
			bot.createMessage(message.channel.id, {
				embed: {
					title: help.help.title,
					description: "Помощь для команды: `" + args[0] + "`",
					color: 16684873,
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					thumbnail: {
						url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "Попросил: " + getUserName(message.member),
					},
					fields: [
						{
							name: ":keyboard: Использование",
							value: "`" + help.commands[args[0]].usage + "`",
						},
						{
							name: ":pencil: Описание",
							value: help.commands[args[0]].description,
						},
					],
				},
			});
			message.delete();
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
			message.delete();
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);
bot.registerCommand(
	"helpg",
	(message, args) => {
		// Send invite for bot
		if (args.length === 0) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: help.helpg.title,
					description: help.helpg.description,
					color: 16684873,
					thumbnail: {
						url:
							"https://i.pinimg.com/originals/c1/a3/a6/c1a3a692568a708b8c760def4a9fdc55.gif",
					},
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "" + getUserName(message.member),
					},
					fields: help.helpg.fields,
				},
			});
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);
bot.registerCommand(
	"helpm",
	(message, args) => {
		// Send invite for bot
		if (args.length === 0) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: help.helpm.title,
					description: help.helpm.description,
					color: 16684873,
					thumbnail: {
						url:
							"https://i.pinimg.com/originals/8a/83/c8/8a83c8978f1b376321fde613d460e88d.gif",
					},
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "" + getUserName(message.member),
					},
					fields: help.helpm.fields,
				},
			});
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);
bot.registerCommand(
	"helpa",
	(message, args) => {
		// Send invite for bot
		if (args.length === 0) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: help.helpa.title,
					description: help.helpa.description,
					color: 16684873,
					thumbnail: {
						url:
							"https://gifimage.net/wp-content/uploads/2018/11/dust-particles-gif-transparent-1.gif",
					},
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "" + getUserName(message.member),
					},
					fields: help.helpa.fields,
				},
			});
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);
bot.registerCommand(
	"helpv",
	(message, args) => {
		// Send invite for bot
		if (args.length === 0) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: help.helpv.title,
					description: help.helpv.description,
					color: 16684873,
					thumbnail: {
						url:
							"https://thumbs.gfycat.com/CoordinatedVainGermanwirehairedpointer-size_restricted.gif",
					},
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "" + getUserName(message.member),
					},
					fields: help.helpv.fields,
				},
			});
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);
bot.registerCommand(
	"helpr",
	(message, args) => {
		// Send invite for bot
		if (args.length === 0) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: help.helpr.title,
					description: help.helpr.description,
					color: 16684873,
					thumbnail: {
						url:
							"https://cdn.dribbble.com/users/46013/screenshots/3587585/sparkle.gif",
					},
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "" + getUserName(message.member),
					},
					fields: help.helpr.fields,
				},
			});
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);
bot.registerCommand(
	"helpo",
	(message, args) => {
		// Send invite for bot
		if (args.length === 0) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: help.helpo.title,
					description: help.helpo.description,
					color: 16684873,
					thumbnail: {
						url: "https://images4.alphacoders.com/991/991403.png",
					},
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "" + getUserName(message.member),
					},
					fields: help.helpo.fields,
				},
			});
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);
bot.registerCommand(
	"helpmod",
	(message, args) => {
		// Send invite for bot
		if (args.length === 0) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: help.helpmod.title,
					description: help.helpmod.description,
					color: 16684873,
					thumbnail: {
						url:
							"https://cdn.dribbble.com/users/93860/screenshots/4591884/scan.gif",
					},
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "" + getUserName(message.member),
					},
					fields: help.helpmod.fields,
				},
			});
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);
bot.registerCommand(
	"helpn",
	(message, args) => {
		// Send invite for bot
		if (args.length === 0) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: help.helpn.title,
					description: help.helpn.description,
					color: 16684873,
					thumbnail: {
						url:
							"https://images-ext-2.discordapp.net/external/0wRNGJyCiIId_punTIHe2KMhXV_Hk9NKOiTQJTxPNfg/https/cdn.dribbble.com/users/6063/screenshots/6237941/_.gif",
					},
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "" + getUserName(message.member),
					},
					fields: help.helpn.fields,
				},
			});
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);
bot.registerCommand(
	"helpd",
	(message, args) => {
		// Send invite for bot
		if (args.length === 0) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: help.helpd.title,
					description: help.helpd.description,
					color: 16684873,
					thumbnail: {
						url:
							"https://thumbs.gfycat.com/ScientificSpicyCat-size_restricted.gif",
					},
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "" + getUserName(message.member),
					},
					fields: help.helpd.fields,
				},
			});
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
bot.registerCommand(
	"invite",
	(message, args) => {
		// Send invite for bot
		if (args.length === 0) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: "Oni инвайт ссылка",
					description: messages.invite.replace(
						"$user",
						message.author.mention
					),
					color: 16684873,
					thumbnail: {
						url: message.author.avatarURL,
					},
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
				},
			}); // Send the invite for Tomoko
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

bot.registerCommand(
	"aboutme",
	(message, args) => {
		// About me command
		if (args.length === 0) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: "История Oni",
					description: messages.aboutme_desc.replace(
						"$user",
						message.author.mention
					),
					color: 16684873,
					thumbnail: {
						url: bot.user.avatarURL,
					},
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					fields: messages.aboutme_fields,
				},
			}); // Send my story
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 8000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 6,
	}
);

bot.registerCommand(
	"support",
	(message, args) => {
		// Support Command
		if (args.length === 0) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: "Поддержка Oni",
					description: messages.support.replace(
						"$user",
						message.author.mention
					),
					color: 16684873,
					thumbnail: {
						url: bot.user.avatarURL,
					},
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
				},
			}); // Send support thing
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

bot.registerCommand(
	"vote",
	(message, args) => {
		// Vote for me :)
		if (args.length === 0) {
			bot.createMessage(message.channel.id, {
				embed: {
					title:
						"Спасибо за вашу поддержку, голос отправлен на сервер!",
					description: messages.vote.replace(
						"$user",
						message.author.mention
					),
					color: 16684873,
					thumbnail: {
						url: bot.user.avatarURL,
					},
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
				},
			}); // Send vote message
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

let pats = require("./src/json/pat.json");
async function pat1(sender, target, channelId) {
	var pat = await neko.getSFWPat();
	logger.info(pat1);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				pats.phrasea[Math.floor(Math.random() * pats.phrasea.length)] +
				" " +
				target,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: pat.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function pat2(sender, target, channelId) {
	var pat = await neko.getSFWPat();
	logger.info(pat2);
	bot.createMessage(channelId, {
		embed: {
			title:
				pats.phrases[Math.floor(Math.random() * pats.phrases.length)] +
				" " +
				sender.username,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: pat.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"pat",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				pat1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			pat2(message.member, message.mentions[0], message.channel.id);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////
let hugs = require("./src/json/hugs.json");
async function hug1(sender, target, channelId) {
	var hug = await neko.getSFWHug();
	logger.info(hug);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				hugs.phrasea[Math.floor(Math.random() * hugs.phrasea.length)] +
				" " +
				target,
			color: 0xff3e3e,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: hug.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function hug2(sender, target, channelId) {
	var hug = await neko.getSFWHug();
	logger.info(hug);
	bot.createMessage(channelId, {
		embed: {
			title:
				hugs.phrases[Math.floor(Math.random() * hugs.phrases.length)] +
				" " +
				sender.username,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: hug.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	});
}

bot.registerCommand(
	"hug",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				hug1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			hug2(message.member, message.mentions[0], message.channel.id);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);

/////////////////////////////////////////////////////////////
let kisss = require("./src/json/kiss.json");
async function kiss1(sender, target, channelId) {
	var kiss = await neko.getSFWKiss();
	logger.info(kiss);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				kisss.phrasea[
					Math.floor(Math.random() * kisss.phrasea.length)
				] +
				" " +
				target,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: kiss.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function kiss2(sender, target, channelId) {
	var kiss = await neko.getSFWKiss();
	logger.info(kiss);
	bot.createMessage(channelId, {
		embed: {
			title:
				kisss.phrases[
					Math.floor(Math.random() * kisss.phrases.length)
				] +
				" " +
				sender.username,
			color: 0xff3e3e,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"kiss",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				kiss1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			kiss2(message.member, message.mentions[0], message.channel.id);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);

////////////////////////////////////
let slaps = require("./src/json/slap.json");
async function slap1(sender, target, channelId) {
	var slap = await neko.getSFWSlap();
	logger.info(slap);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				slaps.phrasea[
					Math.floor(Math.random() * slaps.phrasea.length)
				] +
				" " +
				target,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: slap.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function slap2(sender, target, channelId) {
	var slap = await neko.getSFWSlap();
	logger.info(slap);
	bot.createMessage(channelId, {
		embed: {
			title:
				slaps.phrases[
					Math.floor(Math.random() * slaps.phrases.length)
				] +
				" " +
				sender.username,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: slap.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"slap",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				slap1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			slap2(message.member, message.mentions[0], message.channel.id);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////
let tickles = require("./src/json/tickle.json");
async function tickle1(sender, target, channelId) {
	var tickle = await neko.getSFWTickle();
	logger.info(tickle);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				tickles.phrasea[
					Math.floor(Math.random() * tickles.phrasea.length)
				] +
				" " +
				target,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: tickle.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function tickle2(sender, target, channelId) {
	var tickle = await neko.getSFWTickle();
	logger.info(tickle);
	bot.createMessage(channelId, {
		embed: {
			title:
				tickles.phrases[
					Math.floor(Math.random() * tickles.phrases.length)
				] +
				" " +
				sender.username,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: tickle.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}
bot.registerCommand(
	"tickle",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				tickle1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			tickle2(message.member, message.mentions[0], message.channel.id);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
///////////////////////////////////////////////////////////
let cuddles = require("./src/json/cuddle.json");
async function cuddle1(sender, target, channelId) {
	var cuddle = await neko.getSFWCuddle();
	logger.info(cuddle);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				cuddles.phrasea[
					Math.floor(Math.random() * cuddles.phrasea.length)
				] +
				" " +
				target,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: cuddle.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function cuddle2(sender, target, channelId) {
	var cuddle = await neko.getSFWCuddle();
	logger.info(cuddle);
	bot.createMessage(channelId, {
		embed: {
			title:
				cuddles.phrases[
					Math.floor(Math.random() * cuddles.phrases.length)
				] +
				" " +
				sender.username,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: cuddle.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}
bot.registerCommand(
	"cuddle",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				cuddle1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			cuddle2(message.member, message.mentions[0], message.channel.id);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
////////////////////////////////////////////////////////////////////////
async function meow(sender, channelId) {
	var meow = await neko.getSFWMeow();
	logger.info(meow);
	bot.createMessage(channelId, {
		embed: {
			title: "Пикчи с котиками :3 :cat:",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: meow.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"meow",
	(message, args) => {
		// Meow Command
		if (args.length === 0) {
			meow(message.member, message.channel.id);
			message.delete();
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////////////////////////
let pokes = require("./src/json/poke.json");
async function poke1(sender, target, channelId) {
	var poke = await neko.getSFWPoke();
	logger.info(poke);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				pokes.phrasea[
					Math.floor(Math.random() * pokes.phrasea.length)
				] +
				" " +
				target,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: poke.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function poke2(sender, target, channelId) {
	var poke = await neko.getSFWPoke();
	logger.info(poke);
	bot.createMessage(channelId, {
		embed: {
			title:
				pokes.phrases[
					Math.floor(Math.random() * pokes.phrases.length)
				] +
				" " +
				sender.username,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: poke.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"poke",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				poke1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			poke2(message.member, message.mentions[0], message.channel.id);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);

////////////////////////////////////////////////////////////
let smugs = require("./src/json/smug.json");
async function smug(sender, channelId) {
	var smug = await neko.getSFWSmug();
	logger.info(smug);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				smugs.phrases[Math.floor(Math.random() * smugs.phrases.length)],
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: smug.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"smug",
	(message, args) => {
		// Pat command
		if (args.length === 0) {
			if (message.mentions.length === 0) {
				smug(message.member, message.mentions[0], message.channel.id);
				message.delete();
			}
		} else {
			if (args.length === 1) {
				if (message.mentions.length === 1)
					invalidArgs(
						message,
						message.author,
						message.content.split(" ")[0]
					);
				message.delete();
			}
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////
let bakas = require("./src/json/baka.json");
async function baka1(sender, target, channelId) {
	var baka = await neko.getSFWBaka();
	logger.info(baka);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				bakas.phrasea[
					Math.floor(Math.random() * bakas.phrasea.length)
				] +
				" " +
				target,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: baka.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function baka2(sender, target, channelId) {
	var baka = await neko.getSFWBaka();
	logger.info(baka);
	bot.createMessage(channelId, {
		embed: {
			title:
				bakas.phrases[
					Math.floor(Math.random() * bakas.phrases.length)
				] +
				" " +
				sender.username,
			color: 0xff3e3e,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Oni не злюка💢",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"baka",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				baka1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			baka2(message.member, message.mentions[0], message.channel.id);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
///////////////////////////////////////////////////
let feeds = require("./src/json/feed.json");
async function feed1(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				feeds.phrasea[
					Math.floor(Math.random() * feeds.phrasea.length)
				] +
				" " +
				target,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: feed.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function feed2(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				feeds.phrases[
					Math.floor(Math.random() * feeds.phrases.length)
				] +
				" " +
				sender.username,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: feed.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}
bot.registerCommand(
	"feed",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				feed1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			feed2(message.member, message.mentions[0], message.channel.id);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
///////////////////////////////
async function f_neko(sender, channelId) {
	var i_neko = await neko.getSFWNeko();
	logger.info(i_neko);
	bot.createMessage(channelId, {
		embed: {
			title: "Кошкодевочки",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: i_neko.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"neko",
	(message, args) => {
		// Neko Command
		if (args.length === 0) {
			f_neko(message.member, message.channel.id);
			message.delete();
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
///////////////////////////////////////////
async function nekogif(sender, channelId) {
	var nekogif = await neko.getSFWNekoGif();
	logger.info(nekogif);
	bot.createMessage(channelId, {
		embed: {
			title: "Кошкодевочки, гифки",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: nekogif.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"nekogif",
	(message, args) => {
		// NekoGIF Command
		if (args.length === 0) {
			nekogif(message.member, message.channel.id);
			message.delete();
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////
let bites = require("./src/json/bite.json");
async function bite1(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				bites.phrasea[
					Math.floor(Math.random() * bites.phrasea.length)
				] +
				" " +
				target,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url:
					bites.image[Math.floor(Math.random() * bites.image.length)],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function bite2(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				bites.phrases[
					Math.floor(Math.random() * bites.phrases.length)
				] +
				" " +
				sender.username,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url:
					bites.image[Math.floor(Math.random() * bites.image.length)],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"bite",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				bite1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			bite2(message.member, message.mentions[0], message.channel.id);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
////////////////////////////////////////////////////////////////
let bloodsucks = require("./src/json/bloodsuck.json");
async function bloodsuck1(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				bloodsucks.phrasea[
					Math.floor(Math.random() * bloodsucks.phrasea.length)
				] +
				" " +
				target,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url:
					bloodsucks.image[
						Math.floor(Math.random() * bloodsucks.image.length)
					],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function bloodsuck2(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				bloodsucks.phrases[
					Math.floor(Math.random() * bloodsucks.phrases.length)
				] +
				" " +
				sender.username,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url:
					bloodsucks.image[
						Math.floor(Math.random() * bloodsucks.image.length)
					],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}
bot.registerCommand(
	"bloodsuck",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				bloodsuck1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			bloodsuck2(message.member, message.mentions[0], message.channel.id);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
////////////////////////////////
let holdinghands = require("./src/json/holdhands.json");
async function holdinghand1(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				holdinghands.phrasea[
					Math.floor(Math.random() * holdinghands.phrasea.length)
				] +
				" " +
				target,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url:
					holdinghands.image[
						Math.floor(Math.random() * holdinghands.image.length)
					],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function holdinghand2(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				holdinghands.phrases[
					Math.floor(Math.random() * holdinghands.phrases.length)
				] +
				" " +
				sender.username,
			color: 0xff3e3e,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "💢",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"holdhand",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				holdinghand1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			holdinghand2(
				message.member,
				message.mentions[0],
				message.channel.id
			);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
///////////////////////////////////////////////////////////
let stares = require("./src/json/stare.json");
async function stare1(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				stares.phrasea[
					Math.floor(Math.random() * stares.phrasea.length)
				] +
				" " +
				target,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url:
					stares.image[
						Math.floor(Math.random() * stares.image.length)
					],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function stare2(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				stares.phrases[
					Math.floor(Math.random() * stares.phrases.length)
				] +
				" " +
				sender.username,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url:
					stares.image[
						Math.floor(Math.random() * stares.image.length)
					],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"stare",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				stare1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			stare2(message.member, message.mentions[0], message.channel.id);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
///////////////////////////////////////////////////////
let smiles = require("./src/json/smile.json");
async function smile1(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				smiles.phrasea[
					Math.floor(Math.random() * smiles.phrasea.length)
				] +
				" " +
				target,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url:
					smiles.image[
						Math.floor(Math.random() * smiles.image.length)
					],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function smile2(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				smiles.phrases[
					Math.floor(Math.random() * smiles.phrases.length)
				] +
				" " +
				sender.username,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url:
					smiles.image[
						Math.floor(Math.random() * smiles.image.length)
					],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}
bot.registerCommand(
	"smile",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				smile1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			smile2(message.member, message.mentions[0], message.channel.id);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
//////////////////////////////////////////////////
let blushs = require("./src/json/blush.json");
async function blush(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				blushs.phrases[
					Math.floor(Math.random() * blushs.phrases.length)
				],
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url:
					blushs.image[
						Math.floor(Math.random() * blushs.image.length)
					],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"blush",
	(message, args) => {
		// Pat command
		if (args.length === 0) {
			if (message.mentions.length === 0) {
				blush(message.member, message.mentions[0], message.channel.id);
				message.delete();
			}
		} else {
			if (args.length === 1) {
				if (message.mentions.length === 1)
					invalidArgs(
						message,
						message.author,
						message.content.split(" ")[0]
					);
				message.delete();
			}
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
///////////////////////////////////////////
let sleepys = require("./src/json/sleepy.json");
async function sleepy(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				sleepys.phrases[
					Math.floor(Math.random() * sleepys.phrases.length)
				],
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url:
					sleepys.image[
						Math.floor(Math.random() * sleepys.image.length)
					],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}
bot.registerCommand(
	"sleepy",
	(message, args) => {
		// Pat command
		if (args.length === 0) {
			if (message.mentions.length === 0) {
				sleepy(message.member, message.mentions[0], message.channel.id);
				message.delete();
			}
		} else {
			if (args.length === 1) {
				if (message.mentions.length === 1)
					invalidArgs(
						message,
						message.author,
						message.content.split(" ")[0]
					);
				message.delete();
			}
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
////////////////////////////////////////////////////////////////
let dances = require("./src/json/dance.json");
async function dance(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				dances.phrases[
					Math.floor(Math.random() * dances.phrases.length)
				],
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url:
					dances.image[
						Math.floor(Math.random() * dances.image.length)
					],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}
bot.registerCommand(
	"dance",
	(message, args) => {
		// Pat command
		if (args.length === 0) {
			if (message.mentions.length === 0) {
				dance(message.member, message.mentions[0], message.channel.id);
				message.delete();
			}
		} else {
			if (args.length === 1) {
				if (message.mentions.length === 1)
					invalidArgs(
						message,
						message.author,
						message.content.split(" ")[0]
					);
				message.delete();
			}
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////
let сrys = require("./src/json/cry.json");
async function cry(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				сrys.phrases[Math.floor(Math.random() * сrys.phrases.length)],
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: сrys.image[Math.floor(Math.random() * сrys.image.length)],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}
bot.registerCommand(
	"cry",
	(message, args) => {
		// Pat command
		if (args.length === 0) {
			if (message.mentions.length === 0) {
				cry(message.member, message.mentions[0], message.channel.id);
				message.delete();
			}
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////
let highfives = require("./src/json/highfive.json");
async function highfive1(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				sender.username +
				" " +
				highfives.phrasea[
					Math.floor(Math.random() * highfives.phrasea.length)
				] +
				" " +
				target,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url:
					highfives.image[
						Math.floor(Math.random() * highfives.image.length)
					],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

async function highfive2(sender, target, channelId) {
	var feed = await neko.getSFWFeed();
	logger.info(feed);
	bot.createMessage(channelId, {
		embed: {
			title:
				highfives.phrases[
					Math.floor(Math.random() * highfives.phrases.length)
				] +
				" " +
				sender.username,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url:
					highfives.image[
						Math.floor(Math.random() * highfives.image.length)
					],
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}
bot.registerCommand(
	"highfive",
	(message, args) => {
		// Pat command
		if (args.length === 1) {
			if (message.mentions.length === 1) {
				highfive1(
					message.member,
					message.mentions[0].username,
					message.channel.id
				);
				message.delete();
			}
		} else {
			highfive2(message.member, message.mentions[0], message.channel.id);
			message.delete();
		}
	},

	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////
async function foxgirl(sender, channelId) {
	var foxgirl = await neko.getSFWFoxGirl();
	logger.info(foxgirl);
	bot.createMessage(channelId, {
		embed: {
			title: "Лисичка :fox:",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: foxgirl.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"foxgirl",
	(message, args) => {
		// Fox girl Command
		if (args.length === 0) {
			foxgirl(message.member, message.channel.id);
			message.delete();
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);

async function kemonomimi(sender, channelId) {
	var kemonomimi = await neko.getSFWKemonomimi();
	logger.info(kemonomimi);
	bot.createMessage(channelId, {
		embed: {
			title: "Милые арты",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: kemonomimi.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"kemonomimi",
	(message, args) => {
		// Kemonomimi Command
		if (args.length === 0) {
			kemonomimi(message.member, message.channel.id);
			message.delete();
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);

async function hentaigif(sender, channelId) {
	var p = await neko.getNSFWRandomHentaiGif();
	bot.createMessage(channelId, {
		embed: {
			title: "Hentai gif🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"hg",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				hentaigif(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
//////////////////////////////////////////////////////////
async function pussy(sender, channelId) {
	var hentai = await neko.getNSFWPussy();
	bot.createMessage(channelId, {
		embed: {
			title: "Pussy🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: hentai.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"pussy",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				pussy(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////////////////
async function nekog(sender, channelId) {
	var p = await neko.getNSFWNekoGif();
	bot.createMessage(channelId, {
		embed: {
			title: "Neko gif🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"ng",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				nekog(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////////////////////
async function nekop(sender, channelId) {
	var p = await neko.getNSFWNeko();
	bot.createMessage(channelId, {
		embed: {
			title: "Neko🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"nekop",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				nekop(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
//////////////////////////////////////////////////////////////////////
async function lesbian(sender, channelId) {
	var p = await neko.getNSFWLesbian();
	bot.createMessage(channelId, {
		embed: {
			title: "Lesbian🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"lesbian",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				lesbian(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
////////////////////////////////////////////////////////////////////////////
async function kuni(sender, channelId) {
	var p = await neko.getNSFWKuni();
	bot.createMessage(channelId, {
		embed: {
			title: "Kuni🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"kuni",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				kuni(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
//////////////////////////////////////////////////////////////////////////////
async function cumsluts(sender, channelId) {
	var p = await neko.getNSFWCumsluts();
	bot.createMessage(channelId, {
		embed: {
			title: "Cumsluts🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"cumsluts",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				cumsluts(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
///////////////////////////////////////////////////////////////////////////////
async function classic(sender, channelId) {
	var p = await neko.getNSFWClassic();
	bot.createMessage(channelId, {
		embed: {
			title: "Classic🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"classic",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				classic(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
//////////////////////////////////////////////////////////////////////////
async function boobs(sender, channelId) {
	var p = await neko.getNSFWBoobs();
	bot.createMessage(channelId, {
		embed: {
			title: "Boobs🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"boobs",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				boobs(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////////////////////////
async function bJ(sender, channelId) {
	var p = await neko.getNSFWBJ();
	bot.createMessage(channelId, {
		embed: {
			title: "bJ🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"bj",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				bJ(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
////////////////////////////////////////////////////////////////////////////
async function anal(sender, channelId) {
	var p = await neko.getNSFWAnal();
	bot.createMessage(channelId, {
		embed: {
			title: "Anal🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"anal",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				anal(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
////////////////////////////////////////////////////////////
async function avatars(sender, channelId) {
	var p = await neko.getNSFWAvatar();
	bot.createMessage(channelId, {
		embed: {
			title: "Avatar🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"avatars",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				avatars(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////
async function yuri(sender, channelId) {
	var p = await neko.getNSFWYuri();
	bot.createMessage(channelId, {
		embed: {
			title: "Yuri🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"yuri",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				yuri(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////
async function trap(sender, channelId) {
	var p = await neko.getNSFWTrap();
	bot.createMessage(channelId, {
		embed: {
			title: "Trap🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"trap",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				trap(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
////////////////////////////////////////////////////////////////
async function tits(sender, channelId) {
	var p = await neko.getNSFWTits();
	bot.createMessage(channelId, {
		embed: {
			title: "Tits🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"tits",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				tits(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////////////
async function girlSoloGif(sender, channelId) {
	var p = await neko.getNSFWGirlSoloGif();
	bot.createMessage(channelId, {
		embed: {
			title: "Girl Solo Gif🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"gsg",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				girlSoloGif(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
///////////////////////////////////////////////////////////////
async function girlSolo(sender, channelId) {
	var p = await neko.getNSFWGirlSolo();
	bot.createMessage(channelId, {
		embed: {
			title: "Girl Solo🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"gs",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				girlSolo(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
////////////////////////////////////////////////////////////////////////
async function smallBoobs(sender, channelId) {
	var p = await neko.getNSFWSmallBoobs();
	bot.createMessage(channelId, {
		embed: {
			title: "Small Boobs🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"sb",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				smallBoobs(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
//////////////////////////////////////////////////////////////////
async function pussyWankGif(sender, channelId) {
	var p = await neko.getNSFWPussyWankGif();
	bot.createMessage(channelId, {
		embed: {
			title: "Pussy Wank Gif🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"pwg",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				pussyWankGif(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
///////////////////////////////////////////////////////////////////////////////
async function pussyArt(sender, channelId) {
	var p = await neko.getNSFWPussyArt();
	bot.createMessage(channelId, {
		embed: {
			title: "Pussy Art🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"pussyart",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				pussyArt(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
///////////////////////////////////////////////////////////////////////////////////
async function kemonomimis(sender, channelId) {
	var p = await neko.getNSFWKemonomimi();
	bot.createMessage(channelId, {
		embed: {
			title: "Kemonomimi🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"kemonomimis",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				kemonomimis(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
////////////////////////////////////////////////////////////////////////////
async function kitsune(sender, channelId) {
	var p = await neko.getNSFWKitsune();
	bot.createMessage(channelId, {
		embed: {
			title: "Kitsune🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"kitsune",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				kitsune(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////////////////
async function keta(sender, channelId) {
	var p = await neko.getNSFWKeta();
	bot.createMessage(channelId, {
		embed: {
			title: "Keta🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"keta",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				keta(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
////////////////////////////////////////////////////////////////////////////
async function holo(sender, channelId) {
	var p = await neko.getNSFWHolo();
	bot.createMessage(channelId, {
		embed: {
			title: "Holo🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"holo",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				holo(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
//////////////////////////////////////////////////////////////////////////////////
async function holoEro(sender, channelId) {
	var p = await neko.getNSFWHoloEro();
	bot.createMessage(channelId, {
		embed: {
			title: "Holo Ero🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"holoero",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				holoEro(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////////////////
async function hentai(sender, channelId) {
	var p = await neko.getNSFWHentai();
	bot.createMessage(channelId, {
		embed: {
			title: "Hentai🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"hentai",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				hentai(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
////////////////////////////////////////////////////////////////////////////
async function futanari(sender, channelId) {
	var p = await neko.getNSFWFutanari();
	bot.createMessage(channelId, {
		embed: {
			title: "Futanari🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"futanari",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				futanari(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////////////////////
async function femdom(sender, channelId) {
	var p = await neko.getNSFWFemdom();
	bot.createMessage(channelId, {
		embed: {
			title: "Femdom🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"femdom",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				femdom(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////////////////
async function feetGif(sender, channelId) {
	var p = await neko.getNSFWFeetGif();
	bot.createMessage(channelId, {
		embed: {
			title: "Feet Gif🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"feetgif",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				feetGif(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////////////////////
async function eroFeet(sender, channelId) {
	var p = await neko.getNSFWEroFeet();
	bot.createMessage(channelId, {
		embed: {
			title: "Ero Feet🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"erofeet",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				eroFeet(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
///////////////////////////////////////////////////////////////////////
async function feet(sender, channelId) {
	var p = await neko.getNSFWFeet();
	bot.createMessage(channelId, {
		embed: {
			title: "Feet🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"feet",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				feet(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
//////////////////////////////////////////////////////////////////////////
async function ero(sender, channelId) {
	var p = await neko.getNSFWEro();
	bot.createMessage(channelId, {
		embed: {
			title: "Ero🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"ero",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				ero(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
//////////////////////////////////////////////////////////////////////////////
async function eroKitsune(sender, channelId) {
	var p = await neko.getNSFWEroKitsune();
	bot.createMessage(channelId, {
		embed: {
			title: "Ero Kitsune🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"erokitsune",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				eroKitsune(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////////////////////
async function eroKemonomimi(sender, channelId) {
	var p = await neko.getNSFWEroKemonomimi();
	bot.createMessage(channelId, {
		embed: {
			title: "Ero Kemonomimi🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"erokemonomimi",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				eroKemonomimi(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////////////////////
async function eroNeko(sender, channelId) {
	var p = await neko.getNSFWEroNeko();
	bot.createMessage(channelId, {
		embed: {
			title: "Ero Neko🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"eroneko",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				eroNeko(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
//////////////////////////////////////////////////////////////////////////
async function eroYuri(sender, channelId) {
	var p = await neko.getNSFWEroYuri();
	bot.createMessage(channelId, {
		embed: {
			title: "Ero Yuri🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"eroyuri",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				eroYuri(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////////////////
async function cumArts(sender, channelId) {
	var p = await neko.getNSFWCumArts();
	bot.createMessage(channelId, {
		embed: {
			title: "Cum Arts🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"cumarts",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				cumArts(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
///////////////////////////////////////////////////////////////////////////////
async function blowJob(sender, channelId) {
	var p = await neko.getNSFWBlowJob();
	bot.createMessage(channelId, {
		embed: {
			title: "Blow Job🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"blowjob",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				blowJob(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);
/////////////////////////////////////////////////////////////////////////////
async function pussyGif(sender, channelId) {
	var p = await neko.getNSFWPussyGif();
	bot.createMessage(channelId, {
		embed: {
			title: "Pussy Gif🔞",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			image: {
				url: p.url,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "NSFW module✔",
			},
		},
	}); // Send a message with the GIF as embed.
}

bot.registerCommand(
	"pussygif",
	(message, args) => {
		// Meow Command
		if (message.channel.nsfw === true) {
			if (args.length === 0) {
				pussyGif(message.member, message.channel.id);
				message.delete();
			}
		} else {
			notNSFW(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 6000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 5,
	}
);

async function askTheEightBall(sender, channelId, question) {
	var answer = await neko.getSFW8Ball(question);
	logger.info(answer);
	bot.createMessage(channelId, {
		embed: {
			title: ":8ball: Шар отвечающий на Ваши вопросы",
			description:
				sender.mention +
				", " +
				ball.answer[Math.floor(Math.random() * ball.answer.length)],
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with the answer as embed.
}

bot.registerCommand(
	"8ball",
	(message, args) => {
		// Command to aks the 8ball something
		if (args.length >= 1) {
			askTheEightBall(message.member, message.channel.id, args.join(" "));
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

async function fact(sender, channelId) {
	var fact = await neko.getSFWFact();
	logger.info(fact);
	bot.createMessage(channelId, {
		embed: {
			title: "Интересный факт :bulb:",
			description: fact.fact,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with a fact as embed
}

bot.registerCommand(
	"fact",
	(message, args) => {
		// Command to get a random fact
		if (args.length === 0) {
			fact(message.member, message.channel.id);
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

bot.registerCommand(
	"catfact",
	(message, args) => {
		// Catfact command
		if (args.length === 0) {
			var factId = Math.floor(Math.random() * catfacts.facts.length); // Generate a random number
			bot.createMessage(message.channel.id, {
				embed: {
					title: "Oni о котах :cat: :bulb:",
					description: catfacts.facts[factId],
					color: 16684873,
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "Использовал: " + getUserName(message.member),
					},
				},
			}); // Send a message with a very bad joke as embed
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

bot.registerCommand(
	"joke",
	(message, args) => {
		// Joke command
		if (args.length === 0) {
			var jokeId = Math.floor(Math.random() * jokes.jokes.length); // Generate a random number
			bot.createMessage(message.channel.id, {
				embed: {
					title: "Oni шутки :stuck_out_tongue_winking_eye:",
					description: jokes.jokes[jokeId],
					color: 16684873,
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "Использовал: " + getUserName(message.member),
					},
				},
			}); // Send a message with a very bad joke as embed
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

bot.registerCommand(
	"coinflip",
	(message, args) => {
		// Coin flip
		if (args.length === 0) {
			var result = Math.floor(Math.random() * 2); // Generate a random number
			var sresult = "";
			if (result === 0) {
				sresult = "Орёл";
			} else if (result === 1) {
				sresult = "Решка";
			} else {
				bot.createMessage(message.channel.id, {
					embed: {
						title: "Oni Коинфлип",
						description:
							"Вам выпало, п-погодите, а где монетка?\nП-просто шутка, з-здесь ошибка. Обратитесь за п-помощью",
						color: 16684873,
						author: {
							name: "Oni",
							icon_url: bot.user.avatarURL,
						},
						footer: {
							icon_url: message.author.avatarURL,
							text: "Использовал: " + getUserName(message.member),
						},
					},
				}); // Send a message with the coin flip result
				return;
			}
			bot.createMessage(message.channel.id, {
				embed: {
					title: "Oni коинфлип",
					description: "Выпало:\n:dvd: " + sresult + "!",
					color: 16684873,
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "Использовал: " + getUserName(message.member),
					},
				},
			}); // Send a message with the coin flip result
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

bot.registerCommandAlias("coin", "coinflip"); // Register command alias for lazy people

bot.registerCommand(
	"rolldice",
	(message, args) => {
		// Roll a (virtual) dice
		if (args.length === 0) {
			var result = Math.floor(Math.random() * 6); // Generate a random number
			bot.createMessage(message.channel.id, {
				embed: {
					title: "Oni D",
					description: "Результат:\n:game_die: " + (result + 1) + "!",
					color: 16684873,
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "Использовал: " + getUserName(message.member),
					},
				},
			}); // Send a message with the dice result
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

bot.registerCommandAlias("dice", "rolldice"); // Register command alias for lazy people

async function why(sender, channelId) {
	var why = await neko.getSFWWhy();
	logger.info(why);
	bot.createMessage(channelId, {
		embed: {
			title: "Рандомный вопрос :question:",
			description:
				why.why +
				"`Приносим извинения что эта команда на английском языке. Когда мы сможем найти форум с api на русском мы срочно его заменим`",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with a fact as embed.
}

bot.registerCommand(
	"why",
	(message, args) => {
		// Command to get a random fact
		if (args.length === 0) {
			why(message.member, message.channel.id);
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

async function owo(sender, channelId, text) {
	var owo = await neko.getSFWOwOify({ text: text });
	logger.info(owo.owo);
	bot.createMessage(channelId, {
		embed: {
			title: "Oni текст конвертер",
			description:
				":inbox_tray: Ввод:\n" +
				text +
				"\n:outbox_tray: Вывод:\n" +
				owo.owo,
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			footer: {
				icon_url: sender.avatarURL,
				text: "Команда исполнена✔",
			},
		},
	}); // Send a message with owoified text as embed
}

bot.registerCommand(
	"owoify",
	(message, args) => {
		// Command to owoify a text
		if (args.length >= 1) {
			owo(message.member, message.channel.id, args.join(" "));
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

bot.registerCommandAlias("owofy", "owoify"); // Register command alias for lazy people

bot.registerCommand(
	"lovemeter",
	(message, args) => {
		// LOVEMETER 3000 PRO 2.0
		if (message.mentionEveryone) {
			warnEveryone(
				message,
				message.author,
				message.content.split(" ")[0]
			);
			return;
		}
		var user1;
		var user2;
		if (message.mentions.length === 1) {
			user1 = message.author;
			user2 = message.mentions[0];
		} else if (message.mentions.length === 2) {
			user1 = message.mentions[0];
			user2 = message.mentions[1];
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
			return;
		}
		var love = 0;
		if (user1 == bot.user || user2 == bot.user) {
			if (user1.id === config.ownerId || user2.id === config.ownerId) {
				love = 100;
			} else {
				love = (user1.discriminator + user2.discriminator) % 101;
			}
		} else {
			love = (user1.discriminator + user2.discriminator) % 101;
		}
		var comment =
			"Оу, если вы это видите, тогда случилась ошыбка, лол, втф 1 час ночи а я пишу код, вот я дибил.";
		if (love < 20) {
			comment = "Вау, вы двое должны держатся друг от друга подальше...";
		} else if (love < 45) {
			comment = "Не очень хорошо.";
		} else if (love < 62) {
			comment = "Не плохо, но далеко до идеала.";
		} else if (love < 80) {
			comment = "Довольно хорошо, может быть лучше.";
		} else if (love > 89) {
			comment = "Настоящая любовь!";
		}
		bot.createMessage(message.channel.id, {
			embed: {
				title: "Oni Ультра любовь метр 3000 :heart:",
				description:
					"Результат для " +
					user1.username +
					" и " +
					user2.username +
					":\n" +
					love +
					"%! " +
					comment,
				color: 16684873,
				author: {
					name: "Oni",
					icon_url: bot.user.avatarURL,
				},
				footer: {
					icon_url: message.author.avatarURL,
					text: "Использовал: " + getUserName(message.member),
				},
			},
		}); // Send a message with the love meter result
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

bot.registerCommandAlias("love", "lovemeter"); // Register command alias for lazy people

function handleResponse(response) {
	return response.json().then(function (json) {
		return response.ok ? json : Promise.reject(json);
	});
}

bot.registerCommand(
	"anime",
	(message, args) => {
		// Command to get info about an anime
		if (args.length >= 1) {
			var searchQuery = args.join(" ");
			var query = `
        query ($id: Int, $page: Int, $perPage: Int, $search: String) {
            Page (page: $page, perPage: $perPage) {
                pageInfo {
                    total
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                }
                media (id: $id, search: $search) {
                    id
                    format
                    episodes
                    duration
                    averageScore
                    genres
                    startDate {
                        day
                        month
                        year
                    }
                    endDate {
                        day
                        month
                        year
                    }
                    title {
                        english
                        romaji
                        native
                    }
                }
            }
        }
        `;
			var variables = {
				search: searchQuery,
				page: 1,
				perPage: 9,
				format: "TV",
			};
			var url = "https://graphql.anilist.co",
				options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify({
						query: query,
						variables: variables,
					}),
				};
			fetch(url, options)
				.then(handleResponse)
				.then((data) => {
					console.log(data);
					console.log(data.data);
					console.log(data.data.Page);
					console.log(data.data.Page.pageInfo);
					console.log(data.data.Page.media);
				})
				.catch((err) => {
					logError(err, message.member.shard.id);
				});
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

bot.registerCommand(
	"rps",
	(message, args) => {
		// Rock-paper-scissors game
		if (args.length === 1) {
			var id = Math.floor(Math.random() * 4); // Generate a random number
			var iChose = rpsData.rock;
			if (id === rpsData.paper.id) {
				iChose = rpsData.paper;
			}
			if (id === rpsData.scissors.id) {
				iChose = rpsData.scissors;
			}
			var userChose = undefined;
			if (rpsData.rock.forms.indexOf(args[0]) !== -1) {
				userChose = rpsData.rock;
			}
			if (rpsData.paper.forms.indexOf(args[0]) !== -1) {
				userChose = rpsData.paper;
			}
			if (rpsData.scissors.forms.indexOf(args[0]) !== -1) {
				userChose = rpsData.scissors;
			}
			if (userChose === undefined) {
				bot.createMessage(message.channel.id, {
					embed: {
						title: "Oni КНБ",
						description:
							":x: Ошибка: неправильный аргумент `" +
							args[0] +
							"`!\nПроверьте пожайлуста.",
						color: 16684873,
						author: {
							name: "Oni",
							icon_url: bot.user.avatarURL,
						},
						footer: {
							icon_url: message.author.avatarURL,
							text: "Использовал: " + getUserName(message.member),
						},
					},
				}); // Send a message with the error.
				return;
			}
			var iWon = false;
			var userWon = false;
			var tie = false;
			if (iChose.id === userChose.id) {
				iWon = false;
				userWon = false;
				tie = true;
			}
			if (iChose.winsAgainst === userChose.id) {
				iWon = true;
				userWon = false;
				tie = false;
			}
			if (iChose.losesAgainst === userChose.id) {
				iWon = false;
				userWon = true;
				tie = false;
			}
			var message = "Упс, что то не так.";
			if (iWon === true) {
				message = "Я победила!";
			}
			if (userWon === true) {
				message = "Ты победил(а)!";
			}
			if (tie === true) {
				message = "Оу, кажись ничья!";
			}
			bot.createMessage(message.channel.id, {
				embed: {
					title: "Oni КНБ",
					description:
						"Я выбираю **" + iChose.name + "**! " + message,
					color: 16684873,
					author: {
						name: "Oni",
						icon_url: bot.user.avatarURL,
					},
					footer: {
						icon_url: message.author.avatarURL,
						text: "Использовал: " + getUserName(message.member),
					},
				},
			}); // Send a message with the rps result
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
		}
	},
	{
		cooldown: 4000,
		cooldownMessage: messages.cooldown,
		cooldownReturns: 4,
	}
);

/**bot.registerCommand("name", (message, args) => { // Command template
    if (args.length === 0) {

    } else {
        invalidArgs(message, message.author, message.content.split(" ")[0]);
    }
},
{
    "cooldown": 4000,
    "cooldownMessage": messages.cooldown,
    "cooldownReturns": 4
});**/

bot.on("guildMemberAdd", (guild, member) => {
	// When an user joins the server
	logger.info("Join event called!"); // Log "Join event called!",
	logger.info("Название сервера: " + guild.name + " (ID: " + guild.id + ")"); // the guild name
	logger.info("Название пользователя: " + member.username); // and the username
	var welcomeMsgId = Math.floor(Math.random() * messages.welcome.length); // Generate a random number
	bot.createMessage(guild.systemChannelID, messages.welcome[welcomeMsgId]); // Send a random welcome message
});

bot.on("guildCreate", (guild) => {
	// On a new guild
	logger.info("New guild!"); // Log message
	logger.info("Guild name: " + guild.name + " (ID: " + guild.id + ")"); // the guild name
	logger.info("Icon URL: " + guild.iconURL);
	bot.createMessage(config.guildUpdateChannelId, {
		embed: {
			title: "У нас новый сервер #" + guild.shard.id + "!",
			description:
				"Название: **" +
				guild.name +
				"**\nКоличество участников: **" +
				guild.members.size +
				"**",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			thumbnail: {
				url: guild.iconURL,
			},
		},
	}); // Send a message
});

bot.on("guildDelete", (guild) => {
	// On a lost guild
	logger.info("Lost guild!"); // Log message
	logger.info("Guild name: " + guild.name + " (ID: " + guild.id + ")"); // the guild name
	logger.info("Icon URL: " + guild.iconURL);
	bot.createMessage(config.guildUpdateChannelId, {
		embed: {
			title: "Мы потеряли сервер #" + guild.shard.id + "!",
			description:
				"Название: **" +
				guild.name +
				"**\nКоличество участников: **" +
				guild.members.size +
				"**",
			color: 16684873,
			author: {
				name: "Oni",
				icon_url: bot.user.avatarURL,
			},
			thumbnail: {
				url: guild.iconURL,
			},
		},
	}); // Send a message
});

bot.on("messageCreate", (message) => {
	// When a message is created
	// First off, if the message mentions me,
	// send a random mention message
	if (message.content === bot.user.mention) {
		var mentionMsgId = Math.floor(Math.random() * messages.mention.length); // Generate a random number
		bot.createMessage(
			message.channel.id,
			messages.mention[mentionMsgId].replace(
				"$user",
				message.author.mention
			)
		); // Send a random mention message
	} else if (
		message.mentions.includes(bot.user) &&
		!message.mentionEveryone
	) {
		chat(
			message.channel.id,
			message.content.replace(bot.user.mention + " ", "")
		);
	}
});

bot.registerCommand("dstatus", (message, args) => {
	// Command trigger
	if (args.length === 0) {
		bot.createMessage(message.channel.id, {
			embed: {
				title: "Проверка статуса серверов дискорда",
				description:
					"На этот момент у серверов дискорда **нет проблем!**",
				color: 0x00ff40, ///0x00ff40 (ok) | 0xff3e3e(no)//////
				author: {
					name: "Server status check",
					icon_url: "https://i.redd.it/a8keeuutawx01.gif",
				},
				image: {
					url:
						"https://cdn.discordapp.com/attachments/554272180351926272/595639529789194270/unknown.png",
				},
				footer: {
					icon_url: bot.user.avatarURL,
					text: "Oni💎",
				},
			},
		});
	}
});

bot.registerCommand("time", (message, args) => {
	// Command trigger
	if (args.length === 0) {
		bot.createMessage(message.channel.id, {
			embed: {
				title: "Проверка времени",
				description:
					"Вот время у Вас сейчас: " + " " + moment().format("LTS"),
				color: 16684873,
				author: {
					name: "Oni💎",
					icon_url: bot.user.avatarURL,
				},
				thumbnail: {
					url:
						"https://cdn.dribbble.com/users/96166/screenshots/1398758/clock.gif",
				},
				footer: {
					icon_url:
						"https://media.giphy.com/media/lkMqCh3b8hq7e/giphy.gif",
					text: "Команда выполнена✔",
				},
			},
		}),
			message.delete();
	} else {
		if (args.length === 1) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: "Дата и время сегодня",
					description:
						"Вот полная дата для Вас:" +
						" " +
						moment().format("LLLL"),
					color: 0xd44c02,
					author: {
						name: "Oni💎",
						icon_url: bot.user.avatarURL,
					},
					thumbnail: {
						url:
							"https://thumbs.gfycat.com/AnguishedHauntingDarwinsfox-size_restricted.gif",
					},
					footer: {
						icon_url:
							"https://media.giphy.com/media/lkMqCh3b8hq7e/giphy.gif",
						text: "Команда выполнена✔",
					},
				},
			});
		}
		message.delete();
	}
});

bot.registerCommand("warn", (message, args) => {
	// Command to get the avatar of an user
	if (args.length === 1) {
		if (message.mentionEveryone) {
			warnEveryone(
				message,
				message.author,
				message.content.split(" ")[0]
			);
			return;
		}
		if (message.mentions.length === 1) {
			bot.createMessage(message.channel.id, {
				embed: {
					title: "Внимание⚠",
					description:
						message.mentions[0].username +
						" Вы предупреждены" +
						"\nВаше ID записано в логах " +
						message.mentions[0].id,
					color: 0xff2429,
					author: {
						name: message.author.username,
						icon_url: message.author.avatarURL,
					},
					thumbnail: {
						url:
							"https://media3.giphy.com/media/98x3ZgDX2OXxC/source.gif",
					},
					footer: {
						icon_url: message.mentions[0].avatarURL,
						text:
							"Будьте поаккуратнее и не нарушайте правила сервера!",
					},
				},
			}); // Send a message with the avatar as embed.
		} else {
			invalidArgs(message, message.author, message.content.split(" ")[0]);
			return;
		}
	} else {
		invalidArgs(message, message.author, message.content.split(" ")[0]);
		return;
	}
});
