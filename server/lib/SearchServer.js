'use strict';

const Emitter = require('events');
const querystring = require('querystring');
const cheerio = require('cheerio');
const moment = require('moment');
const fetch = require('node-fetch');

class SearchServer extends Emitter{
  /**
   * @param {String} searchTerm
   */
  constructor(searchTerm) {
    super();
    this._searchTerm = querystring.escape(searchTerm);
    this._regex = /([0-9.]+)\s(\w+)/;
    
    this.thePirateBay();
  }
  
  thePirateBay() {
    const url = `https://thepiratebay.org/search/${this._searchTerm}/0/7/0`;
    const results = /**@type {torrentResult[]}*/ [];
    console.log(`Searching Pirate Bay, url: ${url}`);
    
    fetch(url, {headers: {cookie: 'lw=s'}})
      .then(res => res.text())
      .then(text => {
        const $ = cheerio.load(text);
        const toTimestamp = /**String*/ timeString => {
          if(timeString.includes('Today')) return +moment(timeString.replace('Today', ''), 'HH:mm');
          if(timeString.includes('Y-day')) return +moment(timeString.replace('Y-day', ''), 'HH:mm').subtract(1, 'day');
          
          if(timeString.includes(':')) return +moment(timeString, 'MM-DD HH:mm');
          
          return +moment(timeString, 'MM-DD YYYY');
        };
        
        const toBytes = (byteString) => {
          const regexResult = this._regex.exec(byteString);
          const amount = +regexResult[1];
          const size = regexResult[2];
          
          switch(size) {
            case 'TiB':
              return amount * 1099511627776;
            case 'GiB':
              return amount * 1073741824;
            case 'MiB':
              return amount * 1048576;
            case 'KiB':
              return amount * 1024;
            default:
              return amount;
          }
        };
  
        $('tr', '#searchResult').not('.header').each((i, elem) => {
          const children = $(elem).children();
          
          results.push({
            name: $(children[1]).text(),
            date: toTimestamp($(children[2]).text()),
            magnetLink: $('a', children[3]).attr('href'),
            size: toBytes($(children[4]).text()),
            seed: +$(children[5]).text(),
            leech: +$(children[6]).text()
          });
        });
        
        this.emit('results', results);
      })
      .catch(err => console.log(err));
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