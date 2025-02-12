export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.jest.json", // Use Jest-specific config
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "mjs", "cjs", "json"],
};
