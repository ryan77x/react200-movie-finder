/* global define, it, describe, beforeEach, document */
const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');
const app = require("../server/server");

let nightmare;

app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

app.listen(8888);

const url = 'http://localhost:8888';


describe('expressJS server', () => {
  it('Returns the correct status code when server is running', () => axios.get(url)
    .then(response => expect(response.status === 200)));
});

describe('End to End front-end test scenarious', () => {
  let pageObject;

  describe('Movie finder search page test scenarious', () => {
    beforeEach(() => {
      pageObject = new Nightmare({ show: false })
    });
  
    it('should show a list of movies (at least 2) as bootstrap cards when searching for movie titles containing the word "hello', () => 
      pageObject
      .goto(url)
      .type('#search-input', 'hello')
      .click('#go-button')
      .wait('div.card')
      .wait(250)
      .evaluate(() => document.querySelectorAll('div.card').length)
      .end()
      .then((numberOfCards) => {
        expect(numberOfCards).to.greaterThan(1);
      })
    ).timeout(30000);

    it('should go to movie detail page when more info button is clicked', () => 
    pageObject
    .goto(url)
    .type('#search-input', 'hello')
    .click('#go-button')
    .wait('div.card')
    .wait(250)
    .click('#more-info-button')
    .wait('#movie-detail-header')
    .evaluate(() => document.querySelector('#movie-detail-header').innerHTML)
    .end()
    .then((text) => {
      expect(text).to.equal('Movie Details');
    })
    ).timeout(30000);

    it('movie with title "Batman v Superman: Dawn of Justice" should contain the specified movie title, release year and plot', () => 
    pageObject
    .goto(url)
    .type('#search-input', 'Batman v Superman: Dawn of Justice')
    .click('#go-button')
    .wait('div.card')
    .wait(250)
    .evaluate(() => document.querySelector('#movie-search-body').innerHTML)
    .end()
    .then((text) => {
      expect(text).to.contain('Batman v Superman: Dawn of Justice');
      expect(text).to.contain('2016');
      expect(text).to.contain('Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.');
    })
    ).timeout(30000);

    it('Searching movie with title "11aa22bb" should not return a result', () => 
    pageObject
    .goto(url)
    .type('#search-input', '11aa22bb')
    .click('#go-button')
    .wait('#movie-not-found')
    .wait(250)
    .evaluate(() => document.querySelector('#movie-not-found').innerHTML)
    .end()
    .then((text) => {
      expect(text).to.contain('No movies found.');
     })
    ).timeout(30000);
  
  });

  describe('Movie detail page test scenarious', () => { 
    beforeEach(() => {
      pageObject = new Nightmare({ show: false })
    });
  
    it('should go back to movie search page when "Go Back" link is clicked', () => 
    pageObject
    .goto(url)
    .type('#search-input', 'hello')
    .click('#go-button')
    .wait('div.card')
    .wait(250)
    .click('#more-info-button')
    .wait('#movie-detail-header')
    .click('#go-back')
    .wait('#more-info-button')
    .evaluate(() => document.querySelector('#more-info-button').innerHTML)
    .end()
    .then((text) => {
      expect(text).to.equal('More Information');
    })
    ).timeout(30000);
  
    it('movie with IMDB id "tt2975590" should contain the specified movie title, release year, runtime, genre, plot, award, metascore and IMDB rating', () => 
    pageObject
    .goto(url+'/#/movie/tt2975590')
    .wait('#movie-detail-header')
    .evaluate(() => document.querySelector('#movie-detail-body').innerHTML)
    .end()
    .then((text) => {
      expect(text).to.contain('Batman v Superman: Dawn of Justice');
      expect(text).to.contain('2016');
      expect(text).to.contain('151 min');
      expect(text).to.contain('Action, Adventure, Sci-Fi');
      expect(text).to.contain('Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.');
      expect(text).to.contain('14 wins');
      expect(text).to.contain('44');
      expect(text).to.contain('6.5');
    })
    ).timeout(30000);

    it('movie with IMDB id "ttxxttxxtt" should not be found', () => 
    pageObject
    .goto(url+'/#/movie/ttxxttxxtt')
    .wait('#movie-detail-not-found')
    .evaluate(() => document.querySelector('#movie-detail-not-found').innerHTML)
    .end()
    .then((text) => {
      expect(text).to.contain('No movie detail found.');
    })
    ).timeout(30000);

  });
  
});



