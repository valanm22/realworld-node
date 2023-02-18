import api from "./api";

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
                username: "",
                email: "jake@jake.jake",
                password: ""
            }
        });

        expect(response.status).toBe(422);
        expect(response.body).toEqual({
            error: "Validation Error",
            message: "Email must be unique"
        });
    });
});
