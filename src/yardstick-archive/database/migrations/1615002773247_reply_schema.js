'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReplySchema extends Schema {
  up () {
    this.create('replies', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('text')
      table.string('comment_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('replies')
  }
}

module.exports = ReplySchema
