const Command = require("../../modules/Command.js");

class Say extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      utilisation: "+say salon.id message",
      description: "envoie un message dans un channel.",
      usage: "say",
      category: "Système",
      permLevel: "🔱"
    });
  }

  async run(message, args) {
    const sallon =  args[0]
    try {
      message.member.guild.channels.get(sallon).send(args.slice(1).join(' '))
      message.delete().catch();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Say;
