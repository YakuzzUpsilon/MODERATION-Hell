const config = {
  defaultSettings: {
    prefix: "+",
    modLogChannel: "",
    staffTestRole: "Co-Fondatrice",
    adminRole: "Chef",
    systemNotice: true
  },
  permLevels: [
    { level: 0, name: "Utilisateur", check: () => true },
    {
      level: 1,
      name: "Co-Fondatrice",
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
      name: "Chef",
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
