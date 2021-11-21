"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app/app"));

var _api = require("../app/Routes/api");

_chai["default"].use(_chaiHttp["default"]);

var should = _chai["default"].should();

describe('Manabie Mini testing', function () {
  beforeEach(function (done) {
    //Before each test we empty the database in your case
    done();
  });
  var token = '';
  it('Login account get Token', function (done) {
    var account = {
      username: "test",
      password: "123456"
    };

    _chai["default"].request(_app["default"]).post(_api.apiPath + '/login').send(account).end(function (err, res) {
      var _res$body, _res$body$data;

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Thành công!');
      res.body.should.have.property('status').eql(200);
      token = (_res$body = res.body) === null || _res$body === void 0 ? void 0 : (_res$body$data = _res$body.data) === null || _res$body$data === void 0 ? void 0 : _res$body$data.token;
      done();
    });
  });
  it('Call Task', function (done) {
    var data = {
      content: "test"
    };

    _chai["default"].request(_app["default"]).post(_api.apiPath + '/tasks').set('authorization', 'Bearer ' + token).send(data).end(function (err, res) {
      var _res$body2;

      if (((_res$body2 = res.body) === null || _res$body2 === void 0 ? void 0 : _res$body2.status) === 400) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Đã quá số lượng yêu cầu api');
        res.body.should.have.property('status').eql(400);
      } else {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Thực thi task thành công!');
        res.body.should.have.property('status').eql(200);
      }

      done();
    });
  });
});