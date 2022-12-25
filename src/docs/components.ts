export default {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      id: {
        type: "string",
        description: "An id ",
        example: "1,2,3,4,5",
      },
      Government: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: " identification number",
            example: "1,2,3,4,5",
          },
          name: {
            type: "string",
            description: "government name",
            example: "Tunis,Sousse",
          },
        },
      },
      GovernmentInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "government name",
            example: "Sousse",
          },
        },
      },
      Class: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: " identification number",
            example: "1,2,3,4,5",
          },
          name: {
            type: "string",
            description: "class name",
            example: "Tunis,Sousse",
          },
          teacherId: {
            type: "string",
            description: " belongs to class id number",
            example: "1,2,3,4,5",
          },
        },
      },
      ClassInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "class name",
            example: "MP1",
          },
        },
      },
      Subject: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: " identification number",
            example: "1,2,3,4,5",
          },
          name: {
            type: "string",
            description: "Subject name",
            example: "English..",
          },
          thumbnail: {
            type: "string",
            description: "Subject thubnail",
          },
          slug: {
            type: "string",
            description: "Subject slug",
            example: "mp",
          },
          price: {
            type: "number",
            description: "Subject slug",
            example: "mp",
          },
          classId: {
            type: "string",
            description: " belongs to class id number",
            example: "1,2,3,4,5",
          },
          teacherId: {
            type: "string",
            description: " belongs to class id number",
            example: "1,2,3,4,5",
          },
        },
      },
      SubjectInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "government name",
            example: "English",
          },
          thumbnail: {
            type: "string",
            description: "Subject thumbnail",
          },
          slug: {
            type: "string",
            description: "Subject slug",
            example: "mp",
          },
          price: {
            type: "number",
            description: "Subject price",
            example: "154",
          },
        },
      },
      Chapter: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: " identification number",
            example: "1,2,3,4,5",
          },
          name: {
            type: "string",
            description: "Chapter name",
            example: "Science",
          },
          thumbnail: {
            type: "string",
            description: "Chapter thumbnail",
          },
          price: {
            type: "number",
            description: "Chapter price",
          },
          slug: {
            type: "string",
            description: "Subject slug",
          },
          shortdescription: {
            type: "string",
            description: " short description of chapter",
          },
          longdescription: {
            type: "string",
            description: " detailed description of chapter",
          },
          appproved: {
            type: "boolean",
            description: "true or false",
          },
          status: {
            type: "string",
            description: "chapter is approved or not approved",
          },
          subjectId: {
            type: "string",
            description: " belongs to subject id number",
          },
        },
      },
      ChapterInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Chapter name",
            example: "Science",
          },
          thumbnail: {
            type: "string",
            description: "Chapter thumbnail",
          },
          price: {
            type: "number",
            description: "Chapter price",
          },
          slug: {
            type: "string",
            description: "Subject slug",
          },
          shortdescription: {
            type: "string",
            description: " short description of chapter",
          },
          longdescription: {
            type: "string",
            description: " detailed description of chapter",
          },
          appproved: {
            type: "boolean",
            description: "true or false",
          },
        },
      },
      StudentInput: {
        type: "object",
        properties: {
          firstname: {
            type: "string",
            description: "user firstname",
            example: "tarek",
          },
          lastname: {
            type: "string",
            description: "user lastname",
            example: "chafroud",
          },
          email: {
            type: "string",
            description: "user email",
            example: "tarekchafroud6@gmail.com",
          },
          phone: {
            type: "string",
            description: "user phone_number",
            example: "54456521",
          },
          classId: {
            type: "number",
            description: "class of the user",
          },
          governementId: {
            type: "number",
            description: " governement of the user",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          internal_code: {
            type: "string",
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};
