const Command = require("../../modules/Command.js");

class Say extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      description: "+say salon message",
      usage: "say",
      category: "Système",
      permLevel: "🔑"
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
