const Command = require("../../modules/Command.js");
const fs = require('fs')

class Warn extends Command {
  constructor(client) {
    super(client, {
      name: "warn",
      utilisation: "+warn membre raison",
      description: "Warn un utilisateur.",
      usage: "warn",
      category: "Système",
      permLevel: "Co-Fondatrice
    });
  }

  async run(message, args) {
    const Warnmember =  message.guild.member(message.mentions.users.first() || message.guild.member(args[0]))
    if(Warnmember.hasPermission('MANAGE_MESSAGES')) return message.channel.send("l'utilisateur ne  peut pas être warn.")
    const warns = JSON.parse(fs.readFileSync('./commands/Système/Data/warns.json'))
    if(!Warnmember) return message.channel.send("Veuillez mentionner un utilisateur.")
    const reason = args.slice(1).join(' ')
    let R = ""
    try {
      if(!reason){
        await message.channel.send('**' + Warnmember + '** a été warn.')
        R = "non spécifié"
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
      }
      else{
        await message.channel.send('**' + Warnmember + '** a été warn pour ' + reason + '.')
        R = reason
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
      }
    if (!warns[Warnmember.id]) {
        warns[Warnmember.id] = []
    }
    warns[Warnmember.id].unshift({
        reason: R,
        date: Date.now(),
        mod: message.author.id
    })
    fs.writeFileSync('./commands/Système/Data/warns.json', JSON.stringify(warns))
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Warn;
