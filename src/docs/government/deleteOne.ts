export default {
  delete: {
    tags: ["Government operations"],
    description: "Deleting a Government",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Deleting an exist Government",
      },
    ],
    responses: {
      "200": {
        description: "Government deleted successfully",
      },
      "404": {
        description: "Government not found",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
