const sessions = require('../data/sessions.json')
const { DataSource } = require('apollo-datasource')
const _ = require('lodash')

class SessionAPI extends DataSource {
  constructor() {
    super()
  }

  initialize(config) {}

  getSessions() {
    return sessions
  }

  getSessionById(id) {
    return sessions.id
  }
}

module.exports = SessionAPI
