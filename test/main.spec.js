/* global define, it, describe, beforeEach, document */
const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');

let nightmare;

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

app.listen(8888);

const url = 'http://localhost:8888';


describe('expressJS server', () => {
  beforeEach(() => {
    nightmare = new Nightmare();
  });

  it('Returns the correct status code when it is running', () => axios.get(url)
    .then(response => expect(response.status === 200)));
});

describe('End to End front-end test scenarious', () => {
  let pageObject;

  beforeEach(() => {
    pageObject = new Nightmare();
  });

  it('should show a list of movies as bootstrap cards', () =>
    pageObject
    .goto(url)
    .type('#search-input', 'hello')
    .click('#go-button')
    .wait('div.card')
    .evaluate(() => document.querySelectorAll('div.card').length)
    .end()
    .then((numberOfCards) => {
      expect(numberOfCards).to.greaterThan(1);
    })
  ).timeout(20000);

});



