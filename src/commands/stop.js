const { setError, setSuccess } = require('../helpers')

module.exports = {
  name: 'stop',
  aliases: ['fuckoff', 'end', 'leave'],
  exec: (client, message) => {
    const player = client.player.get(message.guild.id)
    const { channel } = message.member.voice

    if (!player) return setError(message, 'Nothing is currently playing.')
    if (!channel || channel.id !== player.voiceChannel) return setError(message, 'Please join my channel to run commands.')

    player.destroy()
    return setSuccess(message)
  }
}
