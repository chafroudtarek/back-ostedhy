export default {
  post: {
    tags: ["Auth operations"],
    description: "verify account",
    parameters: [
      {
        name: "email",
        in: "query",
        schema: {
          email: {
            type: "string",
          },
        },
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              code: {
                type: "string",
                description: "validation code ",
              },
            },
          },
        },
      },
    },
    responses: {
      "200": {
        description: "verify account successfully",
        content: {
          "application/json": {},
        },
      },
      "404": {
        description: "THERE'S AN ERROR CHECK AGAIN",
        content: {
          "application/json": {},
        },
      },
    },
  },
};
