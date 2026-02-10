import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
});

let cachedEnv: z.infer<typeof envSchema> | null = null;

export function getEnv() {
  if (cachedEnv) return cachedEnv;

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const message = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${message}`);
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}

export function __resetEnvForTests() {
  cachedEnv = null;
}
