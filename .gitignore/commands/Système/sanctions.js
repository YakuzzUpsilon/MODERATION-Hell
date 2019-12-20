const Command = require("../../modules/Command.js");
const fs = require('fs')
const Discord = require('discord.js')

class Sanctions extends Command {
  constructor(client) {
    super(client, {
      name: "sanctions",
      utilisation: "+sanctions membre",
      description: "affiche les sanctions d'un membre.",
      usage: "sanctions",
      category: "Système",
      permLevel: "🔥"
    });
  }

  async run(message, args) {
    const Sancmember =  message.guild.member(message.mentions.users.first() || message.guild.member(args[0]))
    const bans = JSON.parse(fs.readFileSync('./commands/Système/Data/bans.json'))
    const mutes = JSON.parse(fs.readFileSync('./commands/Système/Data/mutes.json'))
    const warns = JSON.parse(fs.readFileSync('./commands/Système/Data/warns.json'))
    try{
        const Sancembed = new Discord.RichEmbed()
        .setAuthor(Sancmember.user.username, Sancmember.user.displayAvatarURL)
        .addField('Warns', ((warns[Sancmember.id] && warns[Sancmember.id].length) ? warns[Sancmember.id].slice().map(e => e.reason) : "Ce membre n'a aucun warns."))
        .addField('Mutes', ((mutes[Sancmember.id] && mutes[Sancmember.id].length) ? mutes[Sancmember.id].slice().map(e => e.mutetime + " pour " + e.reason) : "Ce membre n'a aucun mutes."))
        .addField('Bans', ((bans[Sancmember.id] && bans[Sancmember.id].length) ? bans[Sancmember.id].slice().map(e => e.bantime + " pour " + e.reason) : "Ce membre n'a aucun bans."))
        .setTimestamp()
        message.channel.send(Sancembed)
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Sanctions;
