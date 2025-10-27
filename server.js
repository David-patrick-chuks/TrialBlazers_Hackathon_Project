require('dotenv').config();
require('./controllers/googleOauthController'); // Google OAuth strategy

const express = require('express');
const app = express();
const PORT = process.env.PORT || 1010;
const sequelize = require('./database/databases');
const userRouter = require('./routes/userRoute');
const paymentRouter = require('./routes/paymentRoute');
const kycRouter = require('./routes/kycRoute');
const errand = require('./routes/errandRoutes')
const axios = require('axios');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const session = require('express-session')
const passport = require('passport')

app.use(express.json());
app.use(session({
  secret: 'thecat',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
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
      url: 'https://errandhive-project.onrender.com',
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


app.use('/api/v1', userRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/kyc', kycRouter);
app.use('/api/v1/errand',errand);


app.get('/', (req, res)=>{
  res.send('Welcome to ErrandHive Server! ')
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
