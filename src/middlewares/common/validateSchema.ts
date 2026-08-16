import { Request, Response, NextFunction } from "express";
import { ValidationSource } from "../../types/validation.types";
import z from "zod";

export const validateSchema = (schema: z.ZodType, source: ValidationSource) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const payload = req[source];
    const parsed = schema.safeParse(payload);

    if(!parsed.success) {
      return next(parsed.error);
    }

    req.validated = {
      ...req.validated,
      [source]: parsed.data
    }

    next();
  };
};