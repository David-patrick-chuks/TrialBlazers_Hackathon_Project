require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 1010;
const sequelize = require('./database/databases');
const userRouter = require('./routes/userRoute');
const axios = require('axios');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(express.json());
app.use(cors({origin: '*'}));

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation for the ErrandHive Hackathon project',
    version: '1.0.0',
    description:
      'ErrandHive is a web application created to connect Clients and Runners together to help achieve tasks',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html', // The frontend web link can be added here.
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://google.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Development server',
    },
    {
      url: 'http://localhost:3000',
      description: 'Production server',
    }
  ],
  components:{
    securitySchemes:{
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', //Optional but recommended
        description: 'Enter your JWT token in the format **Bearer &lt;token&gt;**',
      }
    }
  },
  security: [
    {
      bearerAuth: [],
    }
  ]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.use('/api/v1/', userRouter);


app.use('/', (req, res)=>{
  res.send('Welcome to ErrandHive Server!')
})

app.use((error, req, res, next)=>{
    if(error){
        return res.status(500).json({
            message: error.message
        })
    }
    next()
})


const startServer = async () => {
    try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully');
     app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});    
  } catch (error) {
    console.error(`Unable to connect to the database: ${error.message}`);
  }
};

startServer();
