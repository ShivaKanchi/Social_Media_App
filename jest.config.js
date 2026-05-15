module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "./src/database/simple-transformer.js",
  },
  testEnvironment: "node",
};
