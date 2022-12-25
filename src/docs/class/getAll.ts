export default {
  get: {
    tags: ["Class operations"],
    description: "Get Classes",
    parameters: [],
    responses: {
      "200": {
        description: "Classes were obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Class",
            },
          },
        },
      },
    },
  },
};
