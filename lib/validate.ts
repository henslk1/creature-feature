import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export function validate(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if(!result.success) {
      res.status(400).json({ message: "Validation error", errors: z.treeifyError(result.error)})
      return;
    }
    
    req.body = result.data;
    next();
  };
}