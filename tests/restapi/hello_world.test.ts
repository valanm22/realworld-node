import { api } from "@tests/restapi";

describe("hw", () => {
    test("GET /hello", async () => {
        const res = await api.get("/hello");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: "hello" });
    });

    test("GET /world", async () => {
        const res = await api.get("/world");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: "world" });
    });
});
