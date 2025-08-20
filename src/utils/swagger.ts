import swaggerJSDoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Public API Docs',
      version: '1.0.0',
      description: 'Public APIs',
    },
    servers: [{ url: 'http://localhost:4000' }],
  },
  apis: ['./src/routes/*'], 
});

export default swaggerSpec;