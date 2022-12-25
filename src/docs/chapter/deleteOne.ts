export default {
  delete: {
    tags: ["Chapter operations"],
    description: "Deleting a Chapter",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Deleting an exist Chapter",
      },
    ],
    responses: {
      "200": {
        description: "Chapter deleted successfully",
      },
      "404": {
        description: "Chapter not found",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
