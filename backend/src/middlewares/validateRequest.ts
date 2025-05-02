import type { Request, Response, NextFunction } from "express";
import type z from "zod";
import { ZodError } from "zod";

export const validateRequest =
  (schema: z.AnyZodObject) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse(request.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => issue.message);

        return response.status(400).json({
          error: "Invalid request",
          details: errorMessages,
        });
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  };
