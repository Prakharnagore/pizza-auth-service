import app from "../../src/app";
import request from "supertest";
import { User } from "../../src/entity/User";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/config/data-source";
import { Roles } from "../../src/constants";

describe("POST /auth/register", () => {
    let connection: DataSource;

    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        // Database truncate
        await connection.dropDatabase();
        await connection.synchronize();
    });

    afterAll(async () => {
        await connection.destroy();
    });

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
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(1);
            expect(users[0].firstName).toBe(userData.firstName);
            expect(users[0].lastName).toBe(userData.lastName);
            expect(users[0].email).toBe(userData.email);
        });

        it("should return an id of the created user", async () => {
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
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(1);
            expect(typeof users[0].id).toBe("number");
        });
        it("should assign a customer role", async () => {
            // Arrange
            const userData = {
                firstName: "Prakhar",
                lastName: "Nagore",
                email: "prakharnagore000@gmail.com",
                password: "secret",
            };
            // Act
            await request(app).post("/auth/register").send(userData);
            // Assert
            const userRepository = connection.getRepository(User);
            const user = await userRepository.find();
            expect(user[0]).toHaveProperty("role");
            expect(user[0].role).toBe(Roles.CUSTOMER);
        });
    });
    describe("Fields are missing", () => {});
});
