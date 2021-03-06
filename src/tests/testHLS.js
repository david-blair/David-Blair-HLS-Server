
// This file handles all the testing
// I use chai and mocha for testing 
var chai = require('chai');
var chaiHttp  = require('chai-http');
var server = require('../app.js')


// Configure chai
chai.use(chaiHttp);
chai.should();



describe("Videos", () => {
    describe("GET /", () => {
        // Test without a url parameter
        it("should return no url parameter", (done) => {
             chai.request(server)
                 .get('/')
                 .end((err, res) => {
                    res.should.have.status(400);
 
                    res.text.should.be.equal("no url parameter found");
                     done();
                  });
         });
        // Test with a url paramater but not a valid url
        it("should return invalid url", (done) => {
             const id = 1;
             chai.request(server)
                 .get(`/?url=NotAUrl`)
                 .end((err, res) => {
                     res.should.have.status(400);
                     res.text.should.be.equal("invalid url parameter found");
                     done();
                  });
         });

         it("should return invalid url", (done) => {
            // test with a url parameter but not a vaild hls url
            chai.request(server)
                .get(`/?url=https%3A%2F%2Fgoogle.com`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.be.equal("no file at url parameter found");
                    done();
                 });
        });
        it("should return 200 ok", (done) => {
            // test with a valid url and a valid hls
            chai.request(server)
                .get(`/?url=https%3A%2F%2Fvideodelivery.net%2F6aa80e92c92260afabeebba6ea58e661%2Fmanifest%2Fvideo.m3u8`)
                .end((err, res) => {
                    res.should.have.status(200);
    
                    done();
                 });
        }).timeout(100000);
    });
});