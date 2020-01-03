const Command = require("../../modules/Command.js");
const fs = require('fs')

class Ban extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      utilisation: "+ban membre raison",
      description: "Ban un utilisateur.",
      usage: "ban",
      category: "Système",
      permLevel: "Co-Fondatrice"
    });
  }

  async run(message, args) {
    const Banmember =  message.guild.member(message.mentions.users.first() || message.guild.member(args[0]))
    if(Banmember.hasPermission('BAN_MEMBERS')) return message.channel.send("l'utilisateur ne  peut pas être ban.")
    const bans = JSON.parse(fs.readFileSync('./commands/Système/Data/bans.json'))
    if(!Banmember) return message.channel.send("Veuillez mentionner un utilisateur.")
    let R = ""
    const reason = args.slice(1).join(' ')
    try {
      if(!reason){
        message.guild.ban(Banmember)
        await message.channel.send('**' + Banmember + '** a été ban.')
        R = "non spécifié"
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
      }
      else{
        message.guild.ban(Banmember, reason)
        await message.channel.send('**' + Banmember + '** a été ban pour .' + reason + '.')
        R =  reason
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
      }
      if (!bans[Banmember.id]) {
        bans[Banmember.id] = []
        }
        bans[Banmember.id].unshift({
            reason: R,
            bantime: "",
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./commands/Système/Data/bans.json', JSON.stringify(bans))
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Ban;
