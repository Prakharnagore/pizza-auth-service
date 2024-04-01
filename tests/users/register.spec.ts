import app from "../../src/app";
import request from "supertest";

describe("POST /auth/register", () => {
    describe("Givern all fields", () => {
        it("should return the 201 status code", async () => {
            // 3A's
            // Arrange
            const userData = {
                firstName: "Prakhar",
                lastName: "Nagore",
                email: "prakharnagore000@gmail.com",
                password: "secret",
            };
            // Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);
            // Assert
            expect(response.statusCode).toBe(201);
        });
        it("should return valid json response", async () => {
            // 3A's
            // Arrange
            const userData = {
                firstName: "Prakhar",
                lastName: "Nagore",
                email: "prakharnagore000@gmail.com",
                password: "secret",
            };
            // Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);
            // Assert
            expect(
                (response.headers as Record<string, string>)["content-type"],
            ).toEqual(expect.stringContaining("json"));
        });
        it("should persist the user in the database", async () => {
            // Arrange
            const userData = {
                firstName: "Prakhar",
                lastName: "Nagore",
                email: "prakharnagore000@gmail.com",
                password: "secret",
            };
            // Act
            // const response =
            await request(app).post("/auth/register").send(userData);
            // Assert
        });
    });
    describe("Fields are missing", () => {});
});
