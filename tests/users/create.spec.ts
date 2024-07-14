import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/config/data-source";
import app from "../../src/app";
import request from "supertest";
import { describe } from "node:test";
import createJWKSMock, { JWKSMock } from "mock-jwks";
import { User } from "../../src/entity/User";
import { Roles } from "../../src/constants";
import { Tenant } from "../../src/entity/Tenant";
import { createTenant } from "../utils";

describe("POST /users", () => {
    let connection: DataSource;
    let jwks: JWKSMock;

    beforeAll(async () => {
        jwks = createJWKSMock("http://localhost:5501");
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        jwks.start();
        // Database truncate
        await connection.dropDatabase();
        await connection.synchronize();
    });

    afterEach(async () => {
        jwks.stop();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    describe("Given all fields", () => {
        it("should persist the user in the database", async () => {
            // create tenant first
            const tenant = await createTenant(connection.getRepository(Tenant));

            const adminToken = jwks.token({
                sub: "1",
                role: Roles.ADMIN,
            });

            // register user
            const userData = {
                firstName: "Prakhar",
                lastName: "Nagore",
                email: "prakharnagore000@gmail.com",
                password: "secret01",
                tenantId: tenant.id,
                role: Roles.MANAGER,
            };

            // Add token to cookie
            await request(app)
                .post("/users")
                .set("Cookie", [`accessToken=${adminToken}`])
                .send(userData);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            // Assert
            expect(users).toHaveLength(1);
            expect(users[0].email).toBe(userData.email);
        });
        it("should create a manager user", async () => {
            // create tenant first
            const tenant = await createTenant(connection.getRepository(Tenant));

            const adminToken = jwks.token({
                sub: "1",
                role: Roles.ADMIN,
            });

            // register user
            const userData = {
                firstName: "Prakhar",
                lastName: "Nagore",
                email: "prakharnagore000@gmail.com",
                password: "secret01",
                tenantId: tenant.id,
                role: Roles.MANAGER,
            };
            // Add token to cookie
            await request(app)
                .post("/users")
                .set("Cookie", [`accessToken=${adminToken}`])
                .send(userData);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            // Assert
            expect(users).toHaveLength(1);
            expect(users[0].role).toBe(Roles.MANAGER);
        });
        it.todo("should return 403 if non admin user tries to create a user");
    });
});
