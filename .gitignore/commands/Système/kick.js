const Command = require("../../modules/Command.js");

class Kick extends Command {
  constructor(client) {
    super(client, {
      name: "kick",
      utilisation: "+kick membre raison",
      description: "Kick un utilisateur.",
      usage: "kick",
      category: "Système",
      permLevel: "🔥"
    });
  }

  async run(message, args) {
    const Kickmember =  message.guild.member(message.mentions.users.first() || message.guild.member(args[0]))
    if(Kickmember.hasPermission('KICK_MEMBERS')) return message.channel.send("l'utilisateur ne  peut pas être kick.")
    if(!Kickmember) return message.channel.send("Veuillez mentionner un utilisateur.")
    const reason = args.slice(1).join(' ')
    try {
      if(!reason){
        Kickmember.kick()
        await message.channel.send('**' + Kickmember + '** a été exclu.')
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
      }
      else{
        Kickmember.kick()
        await message.channel.send('**' + Kickmember + '** a été exclu pour .' + reason + '.')
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Kick;
