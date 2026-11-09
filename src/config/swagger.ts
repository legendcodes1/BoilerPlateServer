import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.3",
    info: {
      title: "PhilBoilerPlate API",
      version: "1.0.0",
      description:
        "Reusable backend API built with Express, TypeScript and MongoDB",
      termsOfService: "https://swagger.io/terms/",
      contact: {
        email: "test@test.test", // change later
      },
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
    // servers: [
    //   {
    //     url: "http://localhost:8000",
    //     description: "Local development server",
    //   },
    // ],
    host: "localhost:8000",
    basePath: "/",
    tags: [{ name: "users", description: "User Management" }],
    schems: ["http", "https"],
    paths: {
      "/users": {
        get: {
          tags: ["users"],
          summary: "list users",
          responses: { "200": { description: "A list of users" } },
        },
      },
    },
    securityDefinitions: {
      jwt: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
  },
  // apis: ["./src/routes/*.ts"],
  apis: [],
  paths: [],
};

const spec = swaggerJsdoc(options);

const serve = swaggerUi.serve;

const setup = swaggerUi.setup;

export default { spec, serve, setup };
