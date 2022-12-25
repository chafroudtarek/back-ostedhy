export default {
  post: {
    tags: ["Subject operations"],
    description: "Create Subject",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/SubjectInput",
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Subject created successfully",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
