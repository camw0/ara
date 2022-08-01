const { EmbedBuilder } = require('discord.js');
const { setError, setSuccess } = require('../helpers');

module.exports = {
    name: 'np',
    exec: (client, message) => { 
        const player = client.player.get(message.guild.id);
        if (!player) return setError(message, 'Nothing is currently playing.');

        const current = player.queue.current;        
        const embed = new EmbedBuilder()
            .setImage(`https://i3.ytimg.com/vi/${current.identifier}/0.jpg`)
            .setTitle('Now playing - ' + current.title)
            .setFooter({ text: 'Ara' })
            .setURL(current.uri)
            .setColor('#12aaaa')
            .setTimestamp()

        setSuccess(message);
        return message.channel.send({ embeds: [embed] });
    }
}
