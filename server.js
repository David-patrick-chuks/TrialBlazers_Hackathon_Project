require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 1010;
const sequelize = require('./database/databases');
const userRouter = require('./routes/userRoute');
const axios = require('axios');

app.use(express.json());
// app.use(cors({origin: '*'}));


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
