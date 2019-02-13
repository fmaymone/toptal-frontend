import {assert, expect} from 'chai';
import tripService from '../src/services/toptal-api'

describe("TripService", function() {
    before(function(done) {
        tripService.signUp("tester", "tester@test.com", "pw", "pw").then(function(res) {
            done();
        }).catch(function (err) {
            done(err);
        });
    });
    describe("#login", function() {
        it("should log in", (done) => {
            tripService.login("tester@test.com", "pw").then((token) => {
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it("should get a list", (done) => {
            tripService.list().then((trips) => {
                assert.isArray(trips);
                assert.isEmpty(trips);
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });
});