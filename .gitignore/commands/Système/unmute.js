const Command = require("../../modules/Command.js");

class Unmute extends Command {
  constructor(client) {
    super(client, {
      name: "unmute",
      utilisation: "+unmute membre",
      description: "Unmute un utilisateur.",
      usage: "unmute",
      category: "Système",
      permLevel: "Co-Fondatrice"
    });
  }

  async run(message, args) {
    const Unmutemember =  message.guild.member(message.mentions.users.first() || message.guild.member(args[0]))
    if(!Unmutemember) return message.channel.send("Veuillez mentionner un utilisateur.")
    const muterole = message.guild.roles.find(role => role.name === 'Muted')
    try {
        if(muterole && Unmutemember.roles.has(muterole.id)) Unmutemember.removeRole(muterole)
        await message.channel.send(`le mute de ${Unmutemember} a prit fin.`)
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Unmute;
