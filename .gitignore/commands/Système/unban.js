const Command = require("../../modules/Command.js");

class Unban extends Command {
  constructor(client) {
    super(client, {
      name: "unban",
      utilisation: "+unban membre.id",
      description: "Unban un utilisateur.",
      usage: "unban",
      category: "Système",
      permLevel: "🔱"
    });
  }

  async run(message, args) {
    const Unbanmember =  args[0]
    if(!Unbanmember) return message.channel.send("Veuillez rentrer un id.")
    try {
        message.guild.unban(Unbanmember)
        .then(user => message.channel.send(`le ban de ` + '**'+ `${user.username}` + '**' + ` a prit fin.`))
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Unban;
