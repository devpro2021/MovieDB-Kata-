export default {
  // Run ESLint on changes to JavaScript/TypeScript files
  '**/*.(ts|js)?(x)': (filenames) => `lint . ${filenames.join(' ')}`,
};
