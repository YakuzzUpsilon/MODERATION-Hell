const Command = require("../../modules/Command.js");
const fs = require('fs')

class Mute extends Command {
  constructor(client) {
    super(client, {
      name: "mute",
      utilisation: "+mute membre raison",
      description: "Mute un utilisateur.",
      usage: "mute",
      category: "Système",
      permLevel: "🌟"
    });
  }

  async run(message, args) {
    const Mutemember =  message.guild.member(message.mentions.users.first() || message.guild.member(args[0]))
    if(Mutemember.hasPermission('MANAGE_MESSAGES')) return message.channel.send("l'utilisateur ne  peut pas être mute.")
    const mutes = JSON.parse(fs.readFileSync('./commands/Système/Data/mutes.json'))
    if(!Mutemember) return message.channel.send("Veuillez mentionner un utilisateur.")
    const reason = args.slice(1).join(' ')
    let R = ""
    const muterole = message.guild.roles.find(role => role.name === 'Muted')
    try {
      if(!reason){
        Mutemember.addRole(muterole)
        await message.channel.send('**' + Mutemember + '** a été mute.')
        R = "non spécifié"
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
      }
      else{
        Mutemember.addRole(muterole)
        await message.channel.send('**' + Mutemember + '** a été mute pour .' + reason + '.')
        R = reason
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
      }
    if (!mutes[Mutemember.id]) {
        mutes[Mutemember.id] = []
    }
    mutes[Mutemember.id].unshift({
        reason: R,
        mutetime: "",
        date: Date.now(),
        mod: message.author.id
    })
    fs.writeFileSync('./commands/Système/Data/mutes.json', JSON.stringify(mutes))
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Mute;
