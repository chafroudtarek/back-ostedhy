import { format } from "winston";
export default {
  post: {
    tags: ["Students operations"],
    description: "Upload avatar",
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              file: {
                type: "string",
                format: "binary",
              },
            },
          },
        },
      },
    },
    responses: {
      "201": {
        description: " avatar uplaod successfully ",
      },
      "500": {
        description: "Server error",
      },
    },
  },
};
