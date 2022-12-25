export default {
  put: {
    tags: ["Chapter operations"],
    description: "update Chapter",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Id of Chapter to be updated",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ChapterInput",
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Chapter updated successfully",
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
