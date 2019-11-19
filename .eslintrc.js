module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint"
  ],
  "plugins": [
    "prettier",
    "react-hooks",
    "eslint-plugin-import-helpers"
  ],
  "rules": {
    // Prettier
    "prettier/prettier": ["error"],

    // React specific rules
    "react/jsx-filename-extension": "off",

    // Hooks rules
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",

    // Import rules
    "import/prefer-default-export": "off",

    // General rules
    "func-style": ["error", "declaration"],
    "prefer-spread": "off",
    "prefer-destructuring": "off",
    "prefer-object-spread": "off",

    // Typescript
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-function-return-type": "off"
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  },
  "globals": {
    "document": true,
    "window": true
  }
}