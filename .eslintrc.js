module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
  parserOptions: {
    project: 'tsconfig.json', // Points to your TypeScript configuration file
    tsconfigRootDir: __dirname, // Ensures the parser knows the root directory
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: [
    '@typescript-eslint/eslint-plugin', // Enables TypeScript-specific linting rules
    'prettier', // Integrates Prettier for code formatting
  ],
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays Prettier errors as ESLint errors
  ],
  root: true, // Indicates that this is the root ESLint configuration
  env: {
    node: true, // Enables Node.js global variables and Node.js scoping
    jest: true, // Enables Jest global variables for testing
  },
  ignorePatterns: ['.eslintrc.js'], // Ignores the ESLint configuration file itself
  rules: {
    // **TypeScript ESLint Rules**
    '@typescript-eslint/interface-name-prefix': 'off', // Disables enforcing a specific prefix for interface names
    '@typescript-eslint/explicit-function-return-type': 'off', // Disables the requirement for explicit return types on functions
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disables explicit return and argument types on module boundaries
    '@typescript-eslint/no-explicit-any': 'off', // Allows the use of the `any` type

    // **Custom ESLint Rules**
    '@typescript-eslint/no-unused-vars': ['error'], // Throws an error for unused variables
    'prettier/prettier': ['error'], // Throws an error for Prettier formatting issues

    

    // '@typescript-eslint/naming-convention': [
    //   'error',
    //   {
    //     selector: 'interface',
    //     format: ['PascalCase'],
    //     custom: {
    //       regex: '^I[A-Z]',
    //       match: false,
    //     },
    //   },
    // ],
    // 'no-console': 'warn', // Warns about the use of console statements
    // 'no-debugger': 'error', // Disallows the use of debugger statements
  },
};
