import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  handleValidationErrors,
  body("name").isString().notEmpty().withMessage("name Name must be string"),
];

export const validateMyProjectRequest = [
  body("title").notEmpty().withMessage("title must be string"),
  body("shortdesc").notEmpty().withMessage("shortdesc must be string"),
  body("desc").notEmpty().withMessage("description must be string"),
  body("deliveryPrice").notEmpty().withMessage("deliveryPrice must be string"),
  body("startingTime").notEmpty().withMessage("startingTime must be string"),
  body("endingTime").notEmpty().withMessage("endingTime must be string"),
  body("venue").notEmpty().withMessage("venue must be string"),
  body("eventDate").notEmpty().withMessage("eventDate must be string"),
  body("slug").notEmpty().withMessage("slug must be string"),
  handleValidationErrors,
];
