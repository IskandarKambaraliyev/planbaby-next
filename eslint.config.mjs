import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // Consistently import navigation APIs from `@/i18n/navigation`
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/link",
              message: "Please import from `@/i18n/navigation` instead.",
            },
          ],
          patterns: [
            {
              group: ["next/navigation"],
              importNames: [
                "redirect",
                "permanentRedirect",
                "useRouter",
                "usePathname",
              ],
              message: "Please import from `@/i18n/navigation` instead.",
            },
          ],
        },
      ],
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
