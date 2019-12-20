const { Client, Collection } = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const klaw = require("klaw");
const path = require("path");
require("dotenv").config();

class Bot extends Client {
  constructor(options) {
    super(options);

    this.points = new Enmap({
      name: "points",
      cloneLevel: "deep",
      fetchAll: true,
      autoFetch: true
    });

    this.config = require("./config.js");

    this.commands = new Collection();
    this.aliases = new Collection();
    this.queue = new Map();

    this.settings = new Enmap({
      name: "settings",
      cloneLevel: "deep",
      fetchAll: false,
      autoFetch: true
    });

    this.logger = require("./modules/Logger");
    this.wait = require("util").promisify(setTimeout);
  }

  // Permission

  permlevel(message) {
    let permlvl = 0;

    const permOrder = this.config.permLevels
      .slice(0)
      .sort((p, c) => (p.level < c.level ? 1 : -1));

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  }

  loadCommand(commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}${path.sep}${commandName}`))(
        this
      );
      this.logger.log(`Chargement de la commande: ${props.help.name}`, "log");
      props.conf.location = commandPath;
      if (props.init) {
        props.init(this);
      }
      this.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        this.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Impossible de charger la commande ${commandName}: ${e}`;
    }
  }

  async unloadCommand(commandPath, commandName) {
    let command;
    if (this.command.has(commandName)) {
      command = this.commands.get(commandName);
    } else if (this.aliases.has(commandName)) {
      command = this.commands.get(this.aliases.get(commandName));
    }
    if (!command)
      return `La commande \`${commandName}\` ne semble pas exister. Essayez à nouveau!`;

    if (command.shutdown) {
      await command.shutdown(this);
    }
    delete require.cache[
      require.resolve(`${commandPath}${path.sep}${commandName}.js`)
    ];
    return false;
  }

  getSettings(guild) {
    const defaults = this.config.defaultSettings || {};
    const guildData = this.settings.get(guild.id) || {};
    const returnObject = {};
    Object.keys(defaults).forEach(key => {
      returnObject[key] = guildData[key] ? guildData[key] : defaults[key];
    });
    return returnObject;
  }
}

const client = new Bot();
console.log(client.config.permLevels.map(p => `${p.level}: ${p.name}`));

// Fonction d'initialisation

const init = async () => {
  // Récupération des commandes
  klaw("./commands").on("data", item => {
    const cmdFile = path.parse(item.path);
    if (!cmdFile.ext || cmdFile.ext !== ".js") return;
    const response = client.loadCommand(
      cmdFile.dir,
      `${cmdFile.name}${cmdFile.ext}`
    );
    if (response) client.logger.error(response);
  });

  // Récupération des événements
  const evtFiles = await readdir("./events");
  client.logger.log(`Chargement de ${evtFiles.length} événements.`, "log");
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Chargement de l'événement: ${eventName}`);
    const event = new (require(`./events/${file}`))(client);
    client.on(eventName, (...args) => event.run(...args));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  client.login(PROCESS.ENV.TOKEN);
};

init();

const activities = "𝔗𝔥𝔢 ℌ𝔢𝔩𝔩"

client.on('ready', () => {
        client.user.setActivity(activities);
});

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

client.on('raw', async event => {
	// `event.t` is the raw event name
	if (!events.hasOwnProperty(event.t)) return;

	const { d: data } = event;
	const user = client.users.get(data.user_id);
	const channel = client.channels.get(data.channel_id) || await user.createDM();

	// if the message is already in the cache, don't re-emit the event
	if (channel.messages.has(data.message_id)) return;

	// if you're on the master/v12 branch, use `channel.messages.fetch()`
	const message = await channel.fetchMessage(data.message_id);

	// custom emojis reactions are keyed in a `name:ID` format, while unicode emojis are keyed by names
	// if you're on the master/v12 branch, custom emojis reactions are keyed by their ID
	const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	const reaction = message.reactions.get(emojiKey);

	client.emit(events[event.t], reaction, user);
});
