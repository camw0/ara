'use strict'

const config = require('../../config.json')
const { PermissionsBitField } = require('discord.js')
const { setLoading, setError, log } = require('../helpers')

module.exports = {
  exec: async (client, message) => {
    const prefix = message.content.toLowerCase().startsWith(client.prefix) ? client.prefix : `<@!${client.user.id}> `
    const [name, ...args] = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = client.commands.get(name)

    if (!message.guild || message.author.bot) return
    if (!command) return

    if (config.role) {
      if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
        return setError(message, 'You do not have the DJ role.')
      };
    };

    try {
      setLoading(message)
      log(client, message, command.name)
      command.exec(client, message, args)
    } catch (e) {
      console.log(e.stack)
    }
  }
}
