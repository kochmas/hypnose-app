import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { __resetEnvForTests, getEnv } from "./env";

describe("getEnv", () => {
  const originalDatabaseUrl = process.env.DATABASE_URL;

  beforeEach(() => {
    __resetEnvForTests();
    delete process.env.DATABASE_URL;
  });

  afterEach(() => {
    __resetEnvForTests();
    if (originalDatabaseUrl) process.env.DATABASE_URL = originalDatabaseUrl;
    else delete process.env.DATABASE_URL;
  });

  it("throws if DATABASE_URL is missing", () => {
    expect(() => getEnv()).toThrow(/DATABASE_URL/);
  });

  it("returns DATABASE_URL if present", () => {
    process.env.DATABASE_URL = "postgresql://example:example@localhost:5432/example";
    expect(getEnv().DATABASE_URL).toContain("postgresql://");
  });
});

