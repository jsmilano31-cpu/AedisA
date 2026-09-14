import nextPlugin from "@next/eslint-plugin-next";
import typescriptEslint from "typescript-eslint";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**"],
  },
  ...typescriptEslint.configs.recommended,
  nextPlugin.configs["core-web-vitals"],
];

export default eslintConfig;