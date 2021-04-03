'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideosSchema extends Schema {
  up () {
    this.create('videos', (table) => {
      table.increments()
      table.timestamps()
      table.string('url')
      table.string('title')
      table.string('description')
      table.integer('user_id')
    })
  }

  down () {
    this.drop('videos')
  }
}

module.exports = VideosSchema
