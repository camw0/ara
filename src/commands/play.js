const { setError, setSuccess } = require("../helpers");

module.exports = {
    name: 'play',
    exec: async (client, message, args) => {
        if (!message.member.voice.channel) return setError(message, 'You need to join a voice channel to run commands.');
        if (!args.length) return setError(message, 'Please provide a search query or URL.');

        const search = args.join(" ");
        let res;

        try {
            res = await client.player.search(search, message.author);

            if (res.loadType === "LOAD_FAILED") return setError(message, 'Unable to load track (\`LOAD_FAILED\`).');
            else if (res.loadType === "PLAYLIST_LOADED") return setError(message, 'Playlists are not supported with this command (\`PLAYLIST_LOADED\`).');
        } catch (err) {
            return setError(message, 'An unexpected error occurred while finding that track.');
        }

        // Create the player 
        const player = client.player.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
        });
    
        // Connect to the voice channel and add the track to the queue
        player.connect();
        player.queue.add(res.tracks[0]);
    
        // Checks if the client should play the track if it's the first one added
        if (!player.playing && !player.paused && !player.queue.size) player.play()

        return setSuccess(message);
    }
  }