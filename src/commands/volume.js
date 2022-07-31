const { d, e } = require('../helpers'); 

module.exports = {
    name: 'volume',
    exec: (client, message, args) => {
        const player = client.player.get(message.guild.id);
        if (!player) return message.reply('No music is playing.').then(m => d(m));
        if (!args.length) return message.reply(`The volume is currently set to \`${player.volume}%\`.`).then(m => d(m));

        const { channel } = message.member.voice;
        const volume = Number(args[0]);

        if (!channel || channel.id !== player.voiceChannel) return message.reply('Join my voice channel in order to run commands.').then(m => d(m));
        if (!volume || volume < 1 || volume > 100) return message.reply("you need to give me a volume between 1 and 100.").then(m => d(m));

        player.setVolume(volume);
        return message.reply(`Volume set to \`${volume}%\`.`);
    }
}
