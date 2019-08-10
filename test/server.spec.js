const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server/server");

const expect = chai.expect;
chai.use(chaiHttp);

describe('Integration Back-end API routes tests', function() {
  this.timeout(10000);

  describe('/api/movie', () => {

    it('GET /api/movie/?i=tt3896198 responds with JSON content-type of movie data', done => {
      chai
        .request(app)
        .get("/api/movie/?i=tt3896198")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.be.null;
          expect(res).to.be.json;
          done();
        });
    });

    it('GET /api/movie/?i=tt3896198 responds with movie data including Title="Guardians of the Galaxy Vol. 2"', done => {
      chai
        .request(app)
        .get("/api/movie/?i=tt3896198")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.be.null;
          expect(res.body.Title).to.contain("Guardians of the Galaxy Vol. 2");
          done();
        });
    });

    it('GET /api/movie/?i=tt0093175 responds with movie data including JSON key name "Year"', done => {
      chai
        .request(app)
        .get("/api/movie/?i=tt0093175")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.be.null;
          expect(res.body.Year).to.exist;
          done();
        });
    });

    it('GET /api/movie responds with status code 404', done => {
      chai
        .request(app)
        .get("/api/movie")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('GET /api/movie/?i= responds with status code 404', done => {
      chai
        .request(app)
        .get("/api/movie/?i=")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('/api/movies_data', () => {
 
    it('GET /api/movies_data/?s=hello responds with JSON content-type of movie data', done => {
      chai
        .request(app)
        .get("/api/movies_data/?s=hello")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.be.null;
          expect(res).to.be.json;
          done();
        });
    });

    it('GET /api/movies_data/?s=hello responds with movie data including JSON key names "Search", "totalResults" and "Response"', done => {
      chai
        .request(app)
        .get("/api/movies_data/?s=hello")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.be.null;
          expect(res.body.Search).to.exist;
          expect(res.body.totalResults).to.exist;
          expect(res.body.Response).to.exist;
          done();
        });
    });

    it('GET /api/movies_data/?s=hello responds with movie data of at least 2 movies', done => {
      chai
        .request(app)
        .get("/api/movies_data/?s=hello")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.be.null;
          expect(res.body.Search.length).to.greaterThan(1);
          done();
        });
    });

    it('GET /api/movies_data/?s=hello responds with movie data including JSON key names "id" and "Plot"', done => {
      chai
        .request(app)
        .get("/api/movies_data/?s=hello")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(err).to.be.null;
          expect(res.body.Search[0].id).to.exist;
          expect(res.body.Search[0].Plot).to.exist;
          done();
        });
    });

    it('GET /api/movies_data responds with status code 404', done => {
      chai
        .request(app)
        .get("/api/movies_data")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('GET /api/movies_data/?s= responds with status code 404', done => {
      chai
        .request(app)
        .get("/api/movies_data/?s=")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

  });
});
