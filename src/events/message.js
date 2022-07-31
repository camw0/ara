'use strict';

module.exports = {
    exec: async (client, message) => {
        // Some checks to see if it's a valid message
        if (!message.guild || message.author.bot) return;

        const prefix = message.content.toLowerCase().startsWith(client.prefix) ? client.prefix : `<@!${client.user.id}> `;
        const [name, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
      
        // Get the command and check if it exists
        const command = client.commands.get(name);
        if (!command) return;
      
        // Run the command and catch any errors
        try {
            command.exec(client, message, args);
        } catch (e) {
            console.log(e.stack);
            message.reply(`an error occurred while running the command: ${e}`);
        }
    }
}
