module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "plugin:prettier/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "prettier/prettier": [
            "error",
            { singleQuote: false, endOfLine: "auto", tabWidth: 4 },
        ],

        "vue/component-api-style": ["error", ["script-setup", "composition"]],
        "vue/component-definition-name-casing": ["error", "kebab-case"],
        "vue/component-name-in-template-casing": [
            "error",
            "kebab-case",
            {
                registeredComponentsOnly: true,
                ignores: [],
            },
        ],
        "vue/attribute-hyphenation": [
            "error",
            "always" | "never",
            {
                ignore: [],
            },
        ],
        "vue/component-tags-order": [
            "error",
            {
                order: [["template", "script"], "style"],
            },
        ],
        "vue/multi-word-component-names": [
            "error",
            {
                ignores: ["index"],
            },
        ],
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)",
            ],
            env: {
                jest: true,
            },
        },
    ],
};
