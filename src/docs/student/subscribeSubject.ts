export default {
  post: {
    tags: ["Students operations"],
    description: "Subscribte to subject",
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
              subjectId: {
                type: "number",
                description: "id of the subject",
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
