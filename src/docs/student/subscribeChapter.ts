export default {
  post: {
    tags: ["Students operations"],
    description: "Subscribte to chapter",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              studentId: {
                type: "number",
                description: "id of the student who want to subscribe",
              },
              chapterId: {
                type: "number",
                description: "id of the chapter",
              },
            },
          },
        },
      },
    },
    responses: {
      "201": {
        description: " successfully subscribed",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
