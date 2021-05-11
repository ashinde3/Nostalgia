import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';

const app = express();

//Express middleware setup to connect with the application
app.use('/posts', postRoutes);

//Setting up Body-Parser and Cors
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

//Setting Up DB connection
const CONNECTION_URL = 'mongodb+srv://nostalgia:nostalgic2103@cluster0.bbach.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))).catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);