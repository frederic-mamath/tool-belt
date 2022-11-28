module.exports = {
  "tool-belt": {
    input: "http://localhost:8080/v3/api-docs.yaml",
    output: {
      mode: "single",
      target: "./src/generated/hook.ts",
      schemas: "./src/generated/model",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/services/network.ts",
          name: "customInstance",
        },
      },
    },
  },
};
