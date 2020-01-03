const Command = require("../../modules/Command.js");
const ms =require('ms')
const fs = require('fs')

class Tempban extends Command {
  constructor(client) {
    super(client, {
      name: "tempban",
      utilisation: "+tempban membre temps raison",
      description: "Tempban un utilisateur.",
      usage: "tempban",
      category: "Système",
      permLevel: "Co-Fondatrice"
    });
  }

  async run(message, args) {
    const Tempbanmember =  message.guild.member(message.mentions.users.first() || message.guild.member(args[0]))
    if(Tempbanmember.hasPermission('BAN_MEMBERS')) return message.channel.send("l'utilisateur ne  peut pas être ban.")
    const bans = JSON.parse(fs.readFileSync('./commands/Système/Data/bans.json'))
    if(!Tempbanmember) return message.channel.send("Veuillez mentionner un utilisateur.")
    const bantime = args[1];
    if(!bantime) return message.channel.send("Veuillez donner un temps.")
    let R = ""
    const reason = args.slice(2).join(' ')
    try {
      if(!reason){
        message.guild.ban(Tempbanmember)
        await message.channel.send('**' + Tempbanmember + '** a été Banni pendant ' + bantime + '.')
        R = "non spécifié"
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
      }
      else
      {
        message.guild.ban(Tempbanmember, reason)
        await message.channel.send('**' + Tempbanmember + '** a été Banni pendant ' + bantime + ' pour ' + reason + '.')
        R = reason
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
      }
        setTimeout(function(){
            message.guild.unban(Tempbanmember.user.id);
            message.channel.send('le ban de ' + Tempbanmember + ' a prit fin.')
            //member.guild.channels.get(process.env.LOGMOD).send('le ban de ' +member+ ' a prit fin.')
    }, ms(bantime));
    if (!bans[Tempbanmember.id]) {
      bans[Tempbanmember.id] = []
      }
      bans[Tempbanmember.id].unshift({
          reason: R,
          bantime: bantime,
          date: Date.now(),
          mod: message.author.id
      })
      fs.writeFileSync('./commands/Système/Data/bans.json', JSON.stringify(bans))
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Tempban;
