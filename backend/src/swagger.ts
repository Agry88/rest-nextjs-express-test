import swaggerAutogenClient from 'swagger-autogen';

const swaggerAutogen = swaggerAutogenClient();


const outputFile = './swagger_output.json'; // 輸出的文件名稱
const endpointsFiles = ['./index.ts']; // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以

const doc = {
    host: "localhost:3001",
    tags: [ // by default: empty Array
        {
            name: "post",
            description: "post router"
        },
        {
            name: "user",
            description: "使用者 router"
        },
        {
            name: "category",
            description: "category router"
        },
        {
            name: "both",
            description: "mix router"
        },
    ],
}

swaggerAutogen(outputFile, endpointsFiles, doc); // swaggerAutogen 的方法