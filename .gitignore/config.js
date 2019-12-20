const config = {
  defaultSettings: {
    prefix: "+",
    modLogChannel: "silent-logs",
    staffTestRole: "🚫┇Staff Test",
    staffRole: "🦄┇Staff",
    eclairRole: "⚡",
    flammeRole: "🔥",
    etoileRole: "🌟",
    diamantRole: "💎",
    AdminRole: "🔑",
    systemNotice: true
  },
  permLevels: [
    { level: 0, name: "Utilisateur", check: () => true },
    {
      level: 1,
      name: "🚫┇Staff Test",
      check: message => {
        try {
          const staffTestRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.staffTestRole.toLowerCase()
          );
          if (staffTestRole && message.member.roles.has(staffTestRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 2,
      name: "🦄┇Staff",
      check: message => {
        try {
          const staffRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.staffRole.toLowerCase()
          );
          if (staffRole && message.member.roles.has(staffRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 3,
      name: "⚡",
      check: message => {
        try {
          const eclairRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.eclairRole.toLowerCase()
          );
          if (eclairRole && message.member.roles.has(eclairRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 4,
      name: "🔥",
      check: message => {
        try {
          const flammeRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.flammeRole.toLowerCase()
          );
          if (flammeRole && message.member.roles.has(flammeRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 5,
      name: "🌟",
      check: message => {
        try {
          const etoileRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.etoileRole.toLowerCase()
          );
          if (etoileRole && message.member.roles.has(etoileRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 6,
      name: "💎",
      check: message => {
        try {
          const diamantRole = message.guild.roles.find(
            r => r.name.toLowerCase() === message.settings.diamantRole.toLowerCase()
          );
          if (diamantRole && message.member.roles.has(diamantRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      level: 7,
      name: "🔑",
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
  ]
};

module.exports = config;
