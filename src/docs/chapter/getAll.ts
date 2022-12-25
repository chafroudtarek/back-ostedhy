export default {
  get: {
    tags: ["Chapter operations"],
    description: "Get Chapters",
    parameters: [],
    responses: {
      "200": {
        description: "Chapters were obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Chapter",
            },
          },
        },
      },
    },
  },
};
