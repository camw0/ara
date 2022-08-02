'use strict'

const { Manager } = require('erela.js')
const Spotify = require('erela.js-spotify')
const config = require('../../config.json')
const message = require('../events/message')
const { Client, Collection, ActivityType } = require('discord.js')

module.exports = class AraClient extends Client {
  /**
     * @param {import('discord.js').ClientOptions} [opt]
     */
  constructor (opt) {
    super(opt)

    this.commands = new Collection()
    this.prefix = config.prefix ? config.prefix : 'ara '

    this.player = new Manager({
      plugins: [
        new Spotify({
          clientID: config.spotify.id,
          clientSecret: config.spotify.secret
        })
      ],
      nodes: [config.node],
      send: (id, payload) => {
        const guild = this.guilds.cache.get(id)
        if (guild) guild.shard.send(payload)
      }
    })
  };

  start () {
    this
      .on('raw', d => this.player.updateVoiceState(d))
      .on('messageCreate', async m => message.exec(this, m))
      .once('ready', () => { this.player.init(this.user.id); this.activity() })

    this.player
      .on('queueEnd', player => player.destroy())
      .on('nodeError', node => console.log(node.options.host + ' errored'))
      .on('nodeConnect', node => console.log(node.options.host + ' connected'))
      .on('nodeDisonnect', node => console.log(node.options.host + ' disconnected'))

    this.login(config.token)
  }

  activity () {
    this.user.setActivity(config.status ? config.status : 'nothing', { type: ActivityType.Competing })
  }
}
