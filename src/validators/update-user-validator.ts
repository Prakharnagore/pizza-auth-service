import { checkSchema } from "express-validator";
import { UpdateUserRequest } from "../types";

export default checkSchema({
    firstName: {
        errorMessage: "First name is required!",
        notEmpty: true,
        trim: true,
    },
    lastName: {
        errorMessage: "Last name is required!",
        notEmpty: true,
        trim: true,
    },
    role: {
        errorMessage: "Role is required!",
        notEmpty: true,
        trim: true,
    },
    email: {
        isEmail: {
            errorMessage: "Invalid email",
        },
        notEmpty: true,
        errorMessage: "Email is required!",
        trim: true,
    },
    tenantId: {
        errorMessage: "Tenant id is required!",
        trim: true,
        custom: {
            options: async (value: string, { req }) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                const role = (req as UpdateUserRequest).body.role;
                if (role === "admin") {
                    return true;
                } else {
                    return !!value;
                }
            },
        },
    },
});
