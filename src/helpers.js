const { EmbedBuilder } = require("discord.js");

const d = (msg) => { setTimeout(() => msg.delete(), 5000) };

const e = (desc) => new EmbedBuilder().setDescription(desc).setColor('#12aaaa').setFooter('Ara').setTimestamp();

module.exports = { d, e };
