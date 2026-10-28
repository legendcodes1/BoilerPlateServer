module.exports = {
  rootDir: "..",
  testEnvironment: "node",
  transform: {
    "^.+\\.[jt]sx?$": "@swc/jest",
  },
  testMatch: ["**/*.test.ts"],
  clearMocks: true,
};