export default {
  post: {
    tags: ["Chapter operations"],
    description: "Create Chapter",
    parameters: [],
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
      "201": {
        description: "Chapter created successfully",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
