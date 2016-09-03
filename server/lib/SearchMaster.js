'use strict';

const Emitter = require('events');
const querystring = require('querystring');
const cheerio = require('cheerio');
const moment = require('moment');
const fetch = require('node-fetch');

class SearchMaster extends Emitter{
  /**
   * @param {String} searchTerm
   */
  constructor(searchTerm) {
    super();
    this._searchTerm = querystring.escape(searchTerm);
    
    this.thePirateBay();
  }
  
  thePirateBay() {
    const url = `https://thepiratebay.org/search/${this._searchTerm}/0/7/0`;
    const results = [];
    console.log(url);
    
    fetch(url, {headers: {cookie: 'lw=s'}})
      .then(res => res.text())
      .then(text => {
        const $ = cheerio.load(text);
        const toTimestamp = timeString => timeString.includes(':')
          ? +moment(timeString, 'MM-DD HH:mm') 
          : +moment(timeString, 'MM-DD YYYY');
        
        console.log('loaded');
  
        $('tr', '#searchResult').not('.header').each((i, elem) => {
          const children = $(elem).children();
          
          results.push({
            name: $(children[1]).text(),
            date: toTimestamp($(children[2]).text()),
            magnetLink: $('a', children[3]).attr('href'),
            size: $(children[4]).text(),
            seed: $(children[5]).text(),
            leach: $(children[6]).text()
          });
        });
        
        this.emit('results', results);
      })
      .catch(err => console.log(err));
  }
}

module.exports = SearchMaster;