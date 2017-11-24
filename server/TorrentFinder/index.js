'use strict';

const PirateBaySite = require('./sites/PirateBaySite');

class TorrentFinder {
  /**
   * @param {SearchObj} searchObj
   */
  static Search({page, term}) {
    return [ PirateBaySite.Search({term, page}) ];
  }

  /**
   * @param {Array<TorrentResult>} oldResults
   * @param {Array<TorrentResult>} newResults
   */
  static MergeResults(oldResults, newResults) {
    return [...oldResults, ...newResults]
      .map((result, i, arr) => {
        const index = arr.findIndex(r => r.magnetLink === result.magnetLink);
        if (index === -1) return;

        return {
          name: result.name,
          date: result.date,
          magnetLink: result.magnetLink,
          size: Math.max(result.size, arr[index].size),
          seed: Math.max(result.seed, arr[index].seed),
          leech: Math.max(result.leech, arr[index].leech),
        };
      })
      .filter(result => result);
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
 */

exports.modules = TorrentFinder;