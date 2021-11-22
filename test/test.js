import chai from "chai"
import chaiHttp from "chai-http"
import server from "../app/app"
import {apiPath} from "../app/Routes/api"

chai.use(chaiHttp)
let should = chai.should()

describe("GET testing", () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done()
    })

    it("Get List Videos", (done) => {
        chai.request(server)
            .get(apiPath + "/shares")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("message").eql("Thành công!")
                res.body.should.have.property("status").eql(200)
                done()
            })
    })
})

describe("POST testing", () => {
    let cookie = null
    it("Login Account", (done) => {
        let account = {
            email: "admin@admin.com",
            password: "123456"
        }
        chai.request(server)
            .post(apiPath + "/login")
            .send(account)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("message").eql("Thành công!")
                res.body.should.have.property("status").eql(200)
                cookie = res.headers["set-cookie"]?.join(";")
                done()
            })
    })

    it('Add Link Youtube', (done) => {
        let data = {
            link: "https://www.youtube.com/watch?v=szgK1WaI-5w"
        };
        chai.request(server)
            .post(apiPath + '/share/add')
            .set('Cookie', cookie)
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Thêm vào thành công!');
                res.body.should.have.property('status').eql(200);
                done();
            });
    });

    it('Logout', (done) => {
        let data = {};
        chai.request(server)
            .post(apiPath + '/logout')
            .set('Cookie', cookie)
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Logout thành công!');
                res.body.should.have.property('status').eql(200);
                cookie = null
                done();
            });
    });

    it('Registry Account', (done) => {
        let rd = Math.floor(Math.random() * 1000) + 1;
        let account = {
            email: `test_${rd}@test.vn`,
            password: "123456"
        };
        chai.request(server)
            .post(apiPath + '/register')
            .send(account)
            .end((err, res) => {
                if(res.body?.status === 400){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Tài khoản đã tồn tại!');
                    res.body.should.have.property('status').eql(400);
                } else {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Thêm tài khoản thành công!');
                    res.body.should.have.property('status').eql(200);
                }
                done();
            });
    });
})