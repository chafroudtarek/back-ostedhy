export default {
  get: {
    tags: ["Subject operations"],
    description: "Get Subjects",
    parameters: [],
    responses: {
      "200": {
        description: "Subjects were obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Subject",
            },
          },
        },
      },
    },
  },
};
