module.exports = class {
    constructor(client){
        this.client = client;
    }
    async run(messageReaction, user) {
        const message = messageReaction.message;
        const member = message.guild.members.get(user.id);
        const channel = message.guild.channels.find(c => c.name === "général");
        if (member.user.bot) return;

        const testRole = message.guild.roles.find(role => role.name === 'test')
        const validRole = message.guild.roles.find(role => role.name === 'valid')

        if(["test", "valid"].includes(messageReaction.emoji.name) && message.channel.id === channel.id){
            switch(messageReaction.emoji.name){
                case "test":
                    member.addRole(testRole);
                break;
                case "valid":
                    member.addRole(validRole);
                break;
            }
        }
    }
}