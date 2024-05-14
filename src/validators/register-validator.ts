import { checkSchema } from "express-validator";

export default checkSchema({
    email: {
        errorMessage: "Email is required",
        notEmpty: true,
        trim: true,
        isEmail: true,
    },
    firstName: {
        errorMessage: "First name is required",
        notEmpty: true,
        trim: true,
    },
    lastName: {
        errorMessage: "Last name is required",
        notEmpty: true,
        trim: true,
    },
    password: {
        errorMessage: "Password is required",
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 8 } },
    },
});

// other way of doing it
// export default [body("email").notEmpty().withMessage("Email is required")];
