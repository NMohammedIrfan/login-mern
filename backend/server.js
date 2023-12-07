const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const app = express();
const userRoutes=require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors');


dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());


app.use('/api/users',userRoutes);
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, console.log(`Server started on port ${PORT}`));