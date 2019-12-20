const Command = require("../../modules/Command.js");
const Discord = require('discord.js')

class Autorole extends Command {
  constructor(client) {
    super(client, {
      name: "autorole",
      description: "Autorole",
      usage: "autorole",
      category: "Système",
      permLevel: "🔑"
    });
  }

  async run(message) {
    try{
        message.delete();
        const testRole = message.guild.roles.find(role => role.name === 'test')
        const validRole = message.guild.roles.find(role => role.name === 'valid')

        const validEmoji = this.client.emojis.find(emoji => emoji.name === "valid");
        const testEmoji = this.client.emojis.find(emoji => emoji.name === "test");

        const Autoembed = new Discord.RichEmbed()
        .setTitle("Rôles")
        .setDescription("Cliquez sur une des réactions ci de-dessous pour obtenir le rôle correspondant.")
        .setColor("#dc143c")
        .addField(
            "Les rôles disponibles:",
            `
            ${testEmoji} - ${testRole.toString()}
            ${validEmoji} - ${validRole.toString()}
            `
        );
        message.channel.send(Autoembed).then(async msg => {
            await msg.react(validEmoji);
            await msg.react(testEmoji);
        });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Autorole;