import z from "zod";
import { envSchema } from "../schemas/common/env.schema";

export type Env = z.infer<typeof envSchema>;