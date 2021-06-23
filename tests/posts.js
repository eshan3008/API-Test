const fetch = require("node-fetch");
var chai = require('chai')
  , chaiHttp = require('chai-http');
 
chai.use(chaiHttp);
const request = require("supertest");
//const { assert } = require("chai");

var expect = chai.expect;
const baseUrl = 'https://jsonplaceholder.typicode.com/';

describe('POSTS', function () {
    it("GET /posts", function (done) {
        chai.request(baseUrl)
        .get('posts')
        .end(function(err,res){
            expect(res).to.have.status(200);
            expect(res.body).to.not.be.empty;
            expect(res.body.length).to.be.equal(100);
            done();
        });
    });

    it("GET /posts/firstRecord", function (done) {
        chai.request(baseUrl)
        .get('posts/1')
        .end(function(err,res){
            expect(res).to.have.status(200);
            expect(res.body.title).to.equal("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
            expect(res.body.userId).to.equal(1);
            expect(res.body.id).to.equal(1);
            expect(res.body.body).to.equal("quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto");
            done();
        });
    });

    it("GET /posts/invalidposts", function (done) {
         request(baseUrl)
        .get('posts/invalidposts')
        .end(function(err,res){
            expect(res).to.have.status(404);
            expect(res.body).to.be.empty;
            done();
        });
    });

    it('POST /posts', async() => {
            const rawResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            // request(baseUrl)
            // .post("/posts")
            // .send({
            //     title: 'foo',
            //     body: 'bar',
            //     userId: 1,
            // })
            // .end((err,res) => {
            //     expect(res).to.have.status(200);
            //     expect(res.body.status).to.equals("success"); 
            //     done();          
            // });
            // .then((response) => response.json())
            // .then((json) => console.log(json));
            const content = await rawResponse.json();
            expect(content.title).to.equal('foo');
            expect(content.body).to.equal('bar');
            expect(content.userId).to.equal(1);
            expect(content.id).to.equal(101);                
        });

    });
            
          
    it('PUT /posts/:id', async() => {
            const rawResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
                method: 'PUT',
                body: JSON.stringify({
                  title: 'foo',
                  userId: 1,
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
            },
        }) 
                // .then((response) => response.json())
                // .then((json) => console.log(json));
                const content = await rawResponse.json();
                expect(content.title).to.equal('foo');
                expect(content.userId).to.equal(1);
                expect(content.body).to.not.be.null;
    });

    it('DELETE /posts/:id', function(done) {
            // // assert returned response should be empty
           request(baseUrl)
            //     .delete('/posts/1')
  
            //    .then((res) => assert.isEmpty(res.body))
            .del('posts/1')
            .expect(200)
            .end(done);
    });

