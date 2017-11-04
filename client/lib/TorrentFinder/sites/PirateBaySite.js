'use strict';

const cheerio = require('cheerio');
const moment = require('moment');

const bytesRegex =  /([0-9.]+)\s(\w+)/;

class PirateBaySite {
  /**
   * @param {{term: String, page: Number}} searchObj
   * @returns {Promise<Array<Object>>}
   * @constructor
   */
  static Search(searchObj) {
    const url = `https://thepiratebay.org/search/${searchObj.term}/0/7/0`;
    const results = /**@type {torrentResult[]}*/ [];
    console.log(`Searching Pirate Bay, url: ${url}`);
  
    return fetch(url, {headers: {cookie: 'lw=s'}})
      .then(res => res.text())
      .then(text => {
        const $ = cheerio.load(text);
      
        $('tr', '#searchResult').not('.header').each((i, elem) => {
          const children = $(elem).children();
        
          results.push({
            name: $(children[1]).text(),
            date: ToTimestamp($(children[2]).text()),
            magnetLink: $('a', children[3]).attr('href'),
            size: ToBytes($(children[4]).text()),
            seed: +$(children[5]).text(),
            leech: +$(children[6]).text()
          });
        });

        return results;
      })
      .catch(err => console.log(err));
  }
}

/**
 * @param {String} timeString
 * @returns {number}
 */
function ToTimestamp(timeString) {
  if(timeString.includes('Today')) return +moment(timeString.replace('Today', ''), 'HH:mm');
  if(timeString.includes('Y-day')) return +moment(timeString.replace('Y-day', ''), 'HH:mm').subtract(1, 'day');
  
  if(timeString.includes(':')) return +moment(timeString, 'MM-DD HH:mm');
  
  return +moment(timeString, 'MM-DD YYYY');
}

/**
 * @param {String} byteString
 * @returns {number}
 */
function ToBytes(byteString) {
  const regexResult = bytesRegex.exec(byteString);
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
}

module.exports = PirateBaySite;