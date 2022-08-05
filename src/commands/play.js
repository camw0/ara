const { setError, setSuccess } = require('../helpers')

module.exports = {
  name: 'play',
  aliases: ['p'],
  exec: async (client, message, args) => {
    if (!message.member.voice.channel) return setError(message, 'You need to join a voice channel to run commands.')
    if (!args.length) return setError(message, 'Please provide a search query or URL.')

    const search = args.join(' ')

    try {
      const { loadType, playlistInfo: { name }, tracks }= await client.player.search(search, message.author)

      if (loadType === 'LOAD_FAILED' || !tracks.length) return setError(message, 'Unable to load track (`LOAD_FAILED`).')

      const player = client.player.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id
      })

      if (loadType === 'PLAYLIST_LOADED') {
        for (const tracks of track) {
          player.queue.push(track)
        }
      } else {
        player.queue.push(tracks[0])
      }

      player.connect()
      player.setVolume(25)
  
      if (!player.playing && !player.paused && !player.queue.size) player.play()
    } catch (err) {
      return setError(message, 'An unexpected error occurred while attempting to play that.')
    }

    return setSuccess(message)
  }
}
