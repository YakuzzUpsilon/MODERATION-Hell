const Command = require("../../modules/Command.js");
const fs = require('fs')

class Unwarn extends Command {
  constructor(client) {
    super(client, {
      name: "unwarn",
      utilisation: "+unwarn membre",
      description: "enleve le dernier warn d'un utilisateur.",
      usage: "unwarn",
      category: "Système",
      permLevel: "Co-Fondatrice"
    });
  }

  async run(message, args) {
    const Unwarnmember =  message.guild.member(message.mentions.users.first() || message.guild.member(args[0]))
    const warns = JSON.parse(fs.readFileSync('./commands/Système/Data/warns.json'))
    if(!Unwarnmember) return message.channel.send("Veuillez mentionner un utilisateur.")
    try {
        await message.channel.send('**' + Unwarnmember + '** a été Unwarn.')
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
        if (warns[Unwarnmember.id]){
            warns[Unwarnmember.id].shift()
            fs.writeFileSync('./commands/Système/Data/warns.json', JSON.stringify(warns))
        }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Unwarn;
