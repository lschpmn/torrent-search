'use strict';

const Emitter = require('events');
const querystring = require('querystring');
const cheerio = require('cheerio');
const moment = require('moment');
const PirateBaySite = require('./sites/PirateBaySite');

class SearchServer extends Emitter{
  /**
   * @param {Redux.Store} reduxStore
   */
  constructor(reduxStore) {
    super();
    this._reduxStore = reduxStore;
  }
}

module.exports = SearchServer;

/**
 * @typedef {Object} torrentResult
 * @property {String} name
 * @property {Number} date - Epoch timestamp in milliseconds
 * @property {String} magnetLink
 * @property {Number} size - Size of torrents in bytes
 * @property {Number} seed
 * @property {Number} leech
 */