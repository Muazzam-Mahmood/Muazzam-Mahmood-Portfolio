import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * ESLint configuration.
 * Extends Next.js recommended rules and adds project-specific strictness.
 * Zero .js files are allowed — tsconfig enforces this at the compiler level.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Disallow var — use const/let
      "no-var": "error",
      // Warn on console.log left in code (use console.warn/error in prod)
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Enforce consistent return statements
      "consistent-return": "error",
      // Prefer const over let where variable is never reassigned
      "prefer-const": "error",
    },
  },
]);

export default eslintConfig;

