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
        if (!result) return;
        const index = arr.slice(i + 1, arr.length).findIndex(r => r.magnetLink === result.magnetLink);
        if (index === -1) return;

        const oldResult = arr[index];
        arr[index] = false;

        return {
          name: result.name,
          date: result.date,
          magnetLink: result.magnetLink,
          size: Math.max(result.size, oldResult.size),
          seed: Math.max(result.seed, oldResult.seed),
          leech: Math.max(result.leech, oldResult.leech),
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