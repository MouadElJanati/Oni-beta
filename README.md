## Быстрая навигация

> Если Вам нужно быстро найти что-то в документации, Вы можете использовать эту `навигацию`.

- [Об устарении проекта](# Oni-Beta)
- [Установка](#Установка)
- [Лицензия](#Лицензия)


## Oni-Beta

**Обратите внимание, что этот репозиторий больше не поддерживается!**
С новым проектом мы переехали <a href="https://github.com/TFlashgamer/oni-stable" target="_blank">сюда</a>

[![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)](https://travis-ci.org/badges/badgerbadgerbadger)


### Установка

- **Следуйте шаг за шагом что б установить и настроить бота:**

 Убедитесь что у Вас установлена последняя **СТАБИЛЬНАЯ** версия node.js.
 Скачать её можно <a href="https://nodejs.org/uk/" target="_blank">здесь</a>

- Разархивируйте архив и откройте папку в вашем редакторе.

> Откройте консоль и установите необходимые репозитории: 
```shell
$ npm i
```

- После этого откройте файл `config.json` и введите туда нужные данные

```json
{
	"version": "2.7",
	"officialServer": "тут ID сервера",
	"outputChannelId": "тут ID канала где будут сохранятся логи",
	"guildUpdateChannelId": "тут ID канала где будут сохранятся логи",
	"maxSongDuration": 660,
	"shardCount": 3,
	"prefix": "тут префикс",
	"ownerId": "тут ваше ID",
	"guild": "тут ID сервера",
	"DMchannel": "тут ID канала для приватных обращений через бота",
	"LogsChannel": "тут ID канала где будут сохранятся логи",
	"token": "тут токен",
	"owner": "тут ваше ID",
	"debug": true,
	"osu_cache_path": "тут путь к папке с кешом для осу",
	"pp_path": "",
	"beatmap_api": "https://osu.lea.moe",
	"credentials": {
		"bot_token": "тут токен бота",
		"discord_client_id": "тут ID бота",
		"osu_api_key": "тут токен от OSU API",
		"twitch_client_id": "тут twitch ID",
		"pexels_key": "токен Pexels api",
		"last_fm_key": "токен LastFM API",
		"vkapi": "токен VK API",
		"Youtube_token": "токен Youtube API"
	}
}
```

- После того как Вы ввели необходимые данные откройте файл `auth.json` и введите туда токен бота

```json
{
	"token": "тут ваш токен"
}
```

> Откройте консоль и запустите бота:
 ```shell
$ node .
```
- Либо же просто запустите файл `start.bat`

Вот и всё, бот готов к работе.

## Лицензия

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT лицензия](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © <a href="https://tflashgamer.github.io/" target="_blank">/TSlash</a>.
