import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { CustomError, ErrorType } from "@/protocols/error.types";

export default function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      throw new CustomError(ErrorType.UNPROCESSABLE, errors.join(', '));
    }
    next();
  };
}