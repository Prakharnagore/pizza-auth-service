import { checkSchema } from "express-validator";

export default checkSchema({
    email: {
        errorMessage: "Email is required",
        notEmpty: true,
        trim: true,
    },
});

// other way of doing it
// export default [body("email").notEmpty().withMessage("Email is required")];
