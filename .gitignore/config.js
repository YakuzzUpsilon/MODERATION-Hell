const config = {
  defaultSettings: {
    prefix: "+",
    modLogChannel: "",
    muteRole: "🌟",
    kickRole: "⚡",
    banRole: "🔥",
    allRole: "🔱",
    adminRole: "💎",
    oneRole: "🥇",
    systemNotice: true
  },
  permLevels: [
    { level: 0, name: "Utilisateur", check: () => true },
    {
      level: 1,
      name: "🌟",
      check: message => {
        try {
          const muteRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.muteRole.toLowerCase()
          );
          if (muteRole && message.member.roles.has(muteRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 2,
      name: "⚡",
      check: message => {
        try {
          const kickRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.kickRole.toLowerCase()
          );
          if (kickRole && message.member.roles.has(kickRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 3,
      name: "🔥",
      check: message => {
        try {
          const banRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.banRole.toLowerCase()
          );
          if (banRole && message.member.roles.has(banRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 3,
      name: "🔱",
      check: message => {
        try {
          const allRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.allRole.toLowerCase()
          );
          if (allRole && message.member.roles.has(allRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 5,
      name: "💎",
      check: message => {
        try {
          const adminRole = message.guild.roles.find(
            r =>
              r.name.toLowerCase() === message.settings.adminRole.toLowerCase()
          );
          if (adminRole && message.member.roles.has(adminRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
        {
      level: 6,
      name: "🥇",
      check: message => {
        try {
          const oneRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.oneRole.toLowerCase()
          );
          if (oneRole && message.member.roles.has(oneRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
  ]
};

module.exports = config;
