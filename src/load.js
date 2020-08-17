const LogsChannel = "567007210282942495";
/**
 * Fixes possible errors in emoji strings by matching them to a pattern.
 * @param {String} emojiDiscriminator The string from the config file.
 * @returns {*} A proper emojiDiscriminator or null.
 */
function cleanEmojiDiscriminator(emojiDiscriminator) {
	var regEx = /[A-Za-z0-9_]+:[0-9]+/;
	var cleaned = regEx.exec(emojiDiscriminator);
	if (cleaned) return cleaned[0];
	return emojiDiscriminator;
}
/**
 *
 * Creating embed
 *
 */
var Discord = require("discord.js");
const embed = new Discord.RichEmbed()
	.setTitle("ASYNC IIFE working!")
	.setColor(0xe0e0e0) ///0x00ff40 (ok) | 0xff3e3e(fail)//////
	.setFooter("Oni💎");
const embed2 = new Discord.RichEmbed()
	.setTitle("Role Module loaded")
	.setColor(0xe0e0e0) ///0x00ff40 (ok) | 0xff3e3e(fail)//////
	.setFooter("Oni💎");
/**
 * Fetches all messages that need to be tracked into the cache. Makes sure each message is having the proper reactions attached.
 * @param {*} client The bot client.
 * @param {*} configrole
 */
module.exports = function (client, configrole) {
	client.on("ready", () => {
		//Bot ready
		client.channels
			.get(LogsChannel)
			.send("•—————————————————————————————————•");
		console.log("info: Отслеживаю сообщения");
		client.channels.get(LogsChannel).send(embed2);
		console.log(
			'note: Если дальше вы не получаете сообщения "ASYNC IIFE working!", Вам следует обновить Node к версии 7.6.0 или поновее.'
		);
		(async () => {
			var debug_count_messagesFetched = 0;
			console.log("info: ASYNC IIFE working!");
			client.channels.get(LogsChannel).send(embed);
			for (var {
				channel,
				message: message_id,
				reactions,
			} of configrole) {
				var message = await client.channels
					.get(channel)
					.fetchMessage(message_id)
					.catch((error) => console.error(error))
					.catch((error) =>
						client.channels.get(LogsChannel).send("⚠", error)
					);
				if (!message) continue;
				debug_count_messagesFetched += 1;
				for (var { emoji } of reactions) {
					emoji = cleanEmojiDiscriminator(emoji);
					var messageReaction = message.reactions.get(emoji);
					if (!messageReaction) {
						await message
							.react(emoji)
							.catch((error) => console.error(error))
							.catch((error) =>
								client.channels
									.get(LogsChannel)
									.send("⚠", error)
							);
						//No fetch necessary since no prior existing reactions.
					} else {
						if (!messageReaction.me) {
							//Fetch each reaction into cache to keep track of them
							messageReaction.fetchUsers();
							await message
								.react(emoji)
								.catch((error) => console.error(error))
								.catch((error) =>
									client.channels
										.get(LogsChannel)
										.send("⚠", error)
								);
						}
					}
				}
			}
			console.log(
				`info: Всё отлично, отслеживаю ${debug_count_messagesFetched} сообщений.`
			);
		})();
	});
};
