'use strict';

const { readdirSync } = require('fs');
const { IntentsBitField } = require('discord.js');
const AraClient = require('./structures/AraClient');

const client = new AraClient({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
    ]
})

function initCommands () {
    const files = readdirSync(__dirname + '/commands').filter(file => file.endsWith(".js"));

    for (const file of files) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
}

initCommands();
client.start();
