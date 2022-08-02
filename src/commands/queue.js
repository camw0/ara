const { EmbedBuilder } = require('discord.js');
const { setError, setSuccess } = require('../helpers');

module.exports = {
    name: 'queue',
    exec: (client, message, args) => {
        const player = client.player.get(message.guild.id);
        if (!player) return setError(message, 'Nothing is currently playing.');

        const queue = player.queue;
        const queueEmbed = new EmbedBuilder().setTitle('Current Song Queue');

        // change for the amount of tracks per page
        const multiple = 10;
        const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

        const end = page * multiple;
        const start = end - multiple;
        const maxPages = Math.ceil(queue.length / multiple);

        const tracks = queue.slice(start, end);

        if (queue.current) queueEmbed.addFields({ name: 'Current', value: `[${queue.current.title}](${queue.current.uri})` });

        if (!tracks.length) queueEmbed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
        else queueEmbed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri})`).join("\n"));

        queueEmbed.setFooter({ text: `Page ${page > maxPages ? maxPages : page} of ${maxPages}` });

        setSuccess(message);
        return message.channel.send({ embeds: [queueEmbed] });
    }
}