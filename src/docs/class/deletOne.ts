export default {
  delete: {
    tags: ["Class operations"],
    description: "Deleting a Class",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Deleting an exist Class",
      },
    ],
    responses: {
      "200": {
        description: "Class deleted successfully",
      },
      "404": {
        description: "Class not found",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
