const { d } = require('../helpers');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'np',
    exec: (client, message) => { 
        const player = client.player.get(message.guild.id);
        if (!player) return message.reply('there is no player for this guild.').then(m => d(m));

        const current = player.queue.current;        
        const embed = new EmbedBuilder()
            .setImage(`https://i3.ytimg.com/vi/${current.identifier}/0.jpg`)
            .setTitle('Now playing - ' + current.title)
            .setFooter({ text: 'Ara' })
            .setURL(current.uri)
            .setColor('#12aaaa')
            .setTimestamp()

        return message.channel.send({ embeds: [embed] });
    }
}
