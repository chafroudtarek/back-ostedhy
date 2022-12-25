export default {
  get: {
    tags: ["Government operations"],
    description: "Get Governments",
    parameters: [],
    responses: {
      "200": {
        description: "governments were obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Government",
            },
          },
        },
      },
    },
  },
};
