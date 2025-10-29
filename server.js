require('dotenv').config();
require('./controllers/googleOauthController');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const sequelize = require('./database/databases');
const session = require('express-session');
const passport = require('passport');

// Routers
const userRouter = require('./routes/userRoute');
const paymentRouter = require('./routes/paymentRoute');
const kycRouter = require('./routes/kycRoute');
const errandRouter = require('./routes/errandRoutes');
const messageRouter = require('./routes/messageRouter');
const applicationRouter = require('./routes/applicationRoute');

const app = express();
const server = http.createServer(app);

// ---- SOCKET.IO SETUP ----
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ✅ Import modular Socket.IO logic
const initializeChatSocket = require('./sockets/chatSocket');
initializeChatSocket(io);

// ---- MIDDLEWARES ----
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use(session({
  secret: 'thecat',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// ---- ROUTES ----
app.use('/api/v1', userRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/kyc', kycRouter);
app.use('/api/v1/errand', errandRouter);
app.use('/api/v1', messageRouter);
app.use('/api/v1', applicationRouter);


// Swagger setup here (as in your current code)
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ErrandHive API Documentation',
    version: '1.0.0',
    description: 'API for ErrandHive web app connecting clients and runners to complete tasks efficiently.',
    license: {
      name: 'MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'ErrandHive',
      email: 'errand@gmail.com',
      url: 'https://trialblazers-hackathon-project.onrender.com',
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
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token in the format: **Bearer <token>**',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};
const options = { swaggerDefinition, apis: ['./routes/*.js'] };
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to ErrandHive Server!');
});

// Global error handler
app.use((error, req, res, next) => {
  if (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
});

// ---- START SERVER ----
const PORT = process.env.PORT || 1010;
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully');

    server.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error(`Unable to connect to the database: ${error.message}`);
  }
};

startServer();
