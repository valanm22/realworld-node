import api from "./api";
import jwt from "jsonwebtoken";
import env from "../app/global/env";

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

        const token = response.body.user.token;

        expect(jwt.verify(token, env.JWT_SECRET)).toEqual({
            id: 1,
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

    it("should get the current user", async () => {
        const mockedToken = jwt.sign({ id: 1 }, env.JWT_SECRET);

        const response = await api.get("/api/user")
            .set("Authorization", `Token ${mockedToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            user: {
                username: "Jacob",
                email: "jake@jake.jake",
                token: mockedToken, 
                bio: null,
                image: null
            }
        });
    });

    it("should not get the current user without a token", async () => {
        const response = await api.get("/api/user");

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            error: "Unauthorized Error",
            message: "No authorization token was found"
        });
    });

    it("should not accept an invalid token format", async () => {
        const response = await api.get("/api/user")
            .set("Authorization", "Token invalid_format");
        
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            error: "Unauthorized Error",
            message: "Invalid token format"
        });
    });

    it("should not accept an invalid token payload", async () => {
        const mockedToken = jwt.sign({ invalid: "payload" }, env.JWT_SECRET);

        const response = await api.get("/api/user")
            .set("Authorization", `Token ${mockedToken}`);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            error: "Unauthorized Error",
            message: "Token payload is invalid"
        });
    });

    it("should update all user fields", async () => {
        const mockedToken = jwt.sign({ id: 1 }, env.JWT_SECRET);

        const response = await api.put("/api/user")
            .set("Authorization", `Token ${mockedToken}`)
            .send({
                user: {
                    email: "jacob@jacob.jacob",
                    username: "Jake",
                    password: "jacobjacob",
                    bio: "I work at statefarm",
                    image: "Some image URL"
                }
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            user: {
                email: "jacob@jacob.jacob",
                username: "Jake",
                token: mockedToken,
                bio: "I work at statefarm",
                image: "Some image URL"
            }
        });
    });

    it("should update only the provided fields", async () => {
        const mockedToken = jwt.sign({ id: 1 }, env.JWT_SECRET);

        const response = await api.put("/api/user")
            .set("Authorization", `Token ${mockedToken}`)
            .send({
                user: {
                    email: "jake@jake.jake",
                    username: "Jacob"
                }
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            user: {
                email: "jake@jake.jake",
                username: "Jacob",
                token: mockedToken,
                bio: "I work at statefarm",
                image: "Some image URL"
            }
        });
    });
});
