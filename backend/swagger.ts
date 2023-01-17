import swaggerAutogenClient from 'swagger-autogen'

const swaggerAutogen = swaggerAutogenClient()

const outputFile = './swagger_output.json' // output json name

// routes
const endpointsFiles = ['./src/routes/index.ts']

const doc = {
  host: 'localhost:3001',
  basePath: '/api',
  tags: [
    {
      name: 'user',
      description: 'user router'
    }
  ]
}

void swaggerAutogen(outputFile, endpointsFiles, doc)
