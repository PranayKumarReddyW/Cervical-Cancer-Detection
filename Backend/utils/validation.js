const Joi = require("joi");

const validateUser = (userData) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(50).required().messages({
      "string.base": "Full name must be a string",
      "string.min": "Full name must be at least 3 characters long",
      "string.max": "Full name cannot exceed 50 characters",
      "any.required": "Full name is required",
    }),

    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),

    password: Joi.string().min(6).max(100).required().messages({
      "string.min": "Password must be at least 6 characters long",
      "string.max": "Password cannot exceed 100 characters",
      "any.required": "Password is required",
    }),

    mobileNumber: Joi.string()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.pattern.base": "Mobile number must be a valid 10-digit number",
        "any.required": "Mobile number is required",
      }),

    images: Joi.array()
      .items(
        Joi.object({
          image: Joi.string().required().messages({
            "any.required": "Image URL is required",
          }),
          output: Joi.string().required().messages({
            "any.required": "Output is required",
          }),
        })
      )
      .optional(),
  });

  return schema.validate(userData, { abortEarly: false });
};

module.exports = { validateUser };
