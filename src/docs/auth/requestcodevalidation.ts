export default {
  get: {
    tags: ["Auth operations"],
    description: "Request code validation",
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
      {
        name: "phone",
        in: "query",
        schema: {
          email: {
            type: "string",
          },
        },
      },
    ],
    responses: {
      "200": {
        description: "email send successfully",
        content: {
          "application/json": {},
        },
      },
      "404": {
        description: "email doesn't send successfully",
        content: {
          "application/json": {},
        },
      },
    },
  },
};
