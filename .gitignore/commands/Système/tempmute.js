const Command = require("../../modules/Command.js");
const ms =require('ms')
const fs = require('fs')

class Tempmute extends Command {
  constructor(client) {
    super(client, {
      name: "tempmute",
      utilisation: "+tempmute membre temps raison",
      description: "Tempmute un utilisateur.",
      usage: "tempmute",
      category: "Système",
      permLevel: "🚫┇Staff Test"
    });
  }

  async run(message, args) {
    const Tempmutemember =  message.guild.member(message.mentions.users.first() || message.guild.member(args[0]))
    if(Tempmutemember.hasPermission('MANAGE_MESSAGES')) return message.channel.send("l'utilisateur ne  peut pas être mute.")
    const mutes = JSON.parse(fs.readFileSync('./commands/Système/Data/mutes.json'))
    if(!Tempmutemember) return message.channel.send("Veuillez mentionner un utilisateur.")
    const mutetime = args[1];
    if(!mutetime) return message.channel.send("Veuillez rentrer un temps.")
    const muterole = message.guild.roles.find(role => role.name === 'Muted')
    const reason = args.slice(2).join(' ')
    let R = ""
    try {
      if(!reason){
        Tempmutemember.addRole(muterole)
        await message.channel.send('**' + Tempmutemember + '** a été mute pendant ' + mutetime + '.')
        R = "non spécifié"
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
      }
      else{
        Tempmutemember.addRole(muterole)
        await message.channel.send('**' + Tempmutemember + '** a été mute pendant ' + mutetime + ' pour ' + reason + '.')
        R = reason
        //member.guild.channels.get(process.env.LOGMOD).send(member + ' a été exclu.')
      }
        setTimeout(function(){
            if (Tempmutemember.roles.some(role => role.name === "Muted")){
                Tempmutemember.removeRole(muterole);
               message.channel.send(`le mute de ${Tempmutemember} a prit fin.`)
               //member.guild.channels.get(process.env.LOGMOD).send(`le mute de ${member} a prit fin.`)
            }
        }, ms(mutetime));
        if (!mutes[Tempmutemember.id]) {
          mutes[Tempmutemember.id] = []
      }
      mutes[Tempmutemember.id].unshift({
          reason: R,
          mutetime: mutetime,
          date: Date.now(),
          mod: message.author.id
      })
      fs.writeFileSync('./commands/Système/Data/mutes.json', JSON.stringify(mutes))
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Tempmute;
