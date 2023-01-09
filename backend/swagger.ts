import swaggerAutogenClient from 'swagger-autogen';

const swaggerAutogen = swaggerAutogenClient();

const outputFile = './swagger_output.json' // output json name

// routes
const endpointsFiles = [
    './src/routes/index.ts'
]

const doc = {
    host: "localhost:3001",
    basePath: "/api",
    tags: [
        {
            name: "post",
            description: "post router"
        },
        {
            name: "user",
            description: "user router"
        },
        {
            name: "category",
            description: "category router"
        },
        {
            name: "test",
            description: "test router"
        }
    ],
}

swaggerAutogen(outputFile, endpointsFiles, doc)
