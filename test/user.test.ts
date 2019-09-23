import request from "supertest";
import * as superagent from "superagent";

import app from "../src/app";

describe("GET /login", () => {
    it("should return 404 OK", (done) => {
        return request(app)
            .post("/api/user/login")
            .send({
                email: "ziishaned@gmail.com",
                password: "123456",
            })
            .expect(404)
            .end(function (err: any, res: superagent.Response) {
                done();
            });
    });
});