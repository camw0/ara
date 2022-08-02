const { clean, setError, setSuccess } = require('../helpers')

module.exports = {
  name: 'volume',
  exec: (client, message, args) => {
    const player = client.player.get(message.guild.id)
    if (!args.length) return message.reply(`The volume is currently set to \`${player.volume}%\`.`).then(m => clean(m))

    const { channel } = message.member.voice
    const volume = Number(args[0])

    if (!player || !player.queue.current) return setError(message, 'Nothing is currently playing.')
    if (!channel || channel.id !== player.voiceChannel) return setError(message, 'Please join my channel to run commands.')
    if (!volume || volume < 1 || volume > 100) return setError(message, 'You can only set the volume between 0% and 100%.')

    player.setVolume(volume)
    return setSuccess(message)
  }
}
