'use strict'

const config = require('../config.json')

const clean = (msg) => { setTimeout(() => msg.delete(), 5000) }

const log = (client, message, command) => {
  if (!config.logging) return
  return console.log(
        `\n==[${command.toUpperCase()}]============================` +
        '\nMessage ID: ' + message.id +
        '\nTimestamp: ' + message.createdAt.toLocaleTimeString() +
        '\nAuthor: ' + message.author.tag +
        '\nContent: ' + message.content.split(`${client.prefix}${command} `).pop() +
        `\n==[${command.toUpperCase()}]============================\n`
  )
}

const setError = async (message, error) => {
  await message.reactions.removeAll()
  await message.react('❌')
  if (error) message.reply(error).then(m => clean(m))
}

const setSuccess = async (message, success) => {
  await message.reactions.removeAll()
  if (success) message.reply(success).then(m => clean(m))
}

const setLoading = (message) => {
  message.react('1003456285607460914')
}

module.exports = { clean, log, setError, setSuccess, setLoading }
