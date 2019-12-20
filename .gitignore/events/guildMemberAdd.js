const Discord = require('discord.js')

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(member) {
    let embed = new Discord.RichEmbed()
        .setDescription(`Bienvenue ${member} ! Tu fais à présent partie de ${member.guild.name} ! Lis le ${member.guild.channels.get(process.env.REGLEMENT)} et choisis tes ${member.guild.channels.get(process.env.ROLE)}  ! 
Et surtout n'oublie surtout pas d'inviter tes ami(e)s !`)
        .setFooter(`Tu es le ${member.guild.memberCount}ème membre du serveur!`)
        member.guild.channels.get(process.env.GENERAL).send(embed)
  }
};
