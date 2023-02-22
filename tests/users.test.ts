import api from "./api";
import jwt from "jsonwebtoken";
import env from "../app/global/env";

let token = "";

describe("users", () => {
    it("should register a new user", async () => {
        const response = await api.post("/api/users").send({
            user: {
                username: "Jacob",
                email: "jake@jake.jake",
                password: "jakejake"
            }
        });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            user: {
                username: "Jacob",
                email: "jake@jake.jake",
                token: expect.any(String),
                bio: null,
                image: null
            }
        });
    });

    it("should not register a new user with an existing email", async () => {
        const response = await api.post("/api/users").send({
            user: {
                username: "Jacob",
                email: "jake@jake.jake",
                password: "jakejake"
            }
        });

        expect(response.status).toBe(422);
        expect(response.body).toEqual({
            error: "Validation Error",
            message: "Email must be unique"
        });
    });

    it("should login a user", async () => {
        const response = await api.post("/api/users/login").send({
            user: {
                email: "jake@jake.jake",
                password: "jakejake",
            }
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            user: {
                username: "Jacob",
                email: "jake@jake.jake",
                token: expect.any(String),
                bio: null,
                image: null
            }
        });

        token = response.body.user.token;

        expect(jwt.verify(token, env.JWT_SECRET)).toEqual({
            id: expect.any(Number),
            iat: expect.any(Number)
        })
    });

    it("should not login a user with invalid credentials", async () => {
        const response = await api.post("/api/users/login").send({
            user: {
                email: "jake@jake.jake",
                password: "wrong",
            }
        });

        expect(response.status).toBe(422);
        expect(response.body).toEqual({
            error: "Validation Error",
            message: "Password is invalid"
        });
    });
});
