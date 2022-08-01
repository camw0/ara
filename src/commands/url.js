const { EmbedBuilder } = require('discord.js');
const { setError, setSuccess } = require('../helpers');

module.exports = {
    name: 'url',
    exec: (client, message) => { 
        const player = client.player.get(message.guild.id);
        if (!player) return setError(message, 'Nothing is currently playing.');

        const current = player.queue.current;        
        const embed = new EmbedBuilder()
            .setThumbnail(`https://i3.ytimg.com/vi/${current.identifier}/0.jpg`)
            .setDescription(`The URL for the current track (\'${current.title}\') is available on [YouTube](${current.uri}).`)
            .setFooter({ text: 'Ara' })
            .setColor('#12aaaa')
            .setTimestamp()

        setSuccess(message);
        return message.channel.send({ embeds: [embed] });
    }
}
