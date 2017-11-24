'use strict';

const PirateBaySite = require('./sites/PirateBaySite');

class TorrentFinder {
  /**
   * @param {SearchObj} searchObj
   */
  static Search(searchObj) {
    
  }
}

/**
 * @typedef {Object} TorrentResult
 * @property {String} name
 * @property {Number} date
 * @property {String} magnetLink
 * @property {Number} size
 * @property {String} seed
 * @property {String} leech
 * 
 */

/**
 * @typedef {Object} SearchObj
 * @property {String} term
 * @property {Number} page
 * @returns {Promise<Array<Object>>}
 */

exports.modules = TorrentFinder;