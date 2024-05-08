import express from 'express';
import { Dictionary } from 'express-serve-static-core';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

const app = express() as express.Application;
const port = 3000 as number;
dotenv.config();
const mongo_uri = process.env.MONGO_URI as string;

// Connect to MongoDB
mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions);

const db = mongoose.connection as mongoose.Connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB')
});

const booksSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    sales: Number,
    genre: [String],
    publisher: String,
    publishDate: Date,
    language: String
});

const booksModel = mongoose.model('books', booksSchema);


app.get('/api', (req:any, res:any) => {
    res.send('Hello World!');
});

// Book APIs
app.get('/api/search', (req:any, res:any) => {
    const input = req.query.input as string;
    const result = booksModel.find({title: input});
    res.send(result);
});
app.get('/api/getBestSellings', async(req:any, res:any) => {
    const bestSellings = await booksModel.find({}).sort({sales: -1});
    res.send(bestSellings);
});
app.get('/api/getRecommendations', async(req:any, res:any) => {
    const genres = req.query.genres as Array<string>;
    const recommendations = booksModel.find({genre: {$in: genres}});
    res.send(recommendations);
});
app.get('/api/getNewArrival', async(req:any, res:any) => {
    const limits = [
        [0, 1],
        [1, 7],
        [7, 30],
        [30, 90],
        [90, 365]
    ]
    const today = new Date();
    const newArrival = Array(limits.length).fill(0);
    for(let i = 0; i < limits.length; i++) {
        const start = new Date(today);
        start.setDate(today.getDate() - limits[i][0]);
        const end = new Date(today);
        end.setDate(today.getDate() - limits[i][1]);
        newArrival[i] = await booksModel.find({publishDate: {$gte: end, $lt: start}});
    }
    res.send(newArrival);
});
app.get('/api/getBookInfo', async(req:any, res:any) => {
    const bookId = req.query.bookId as number;
    const bookInfo = await booksModel.findById(bookId);
    res.send(bookInfo);
});


// User APIs
app.post('/api/login', (req:any, res:any) => {});
app.post('/api/register', (req:any, res:any) => {});
app.post('/api/logout', (req:any, res:any) => {});
app.post('/api/forgotPassword', (req:any, res:any) => {});
app.get('/api/getUserInfo', (req:any, res:any) => {});

// MyFavorite APIs
app.post('/api/addFavorite', (req:any, res:any) => {});
app.post('/api/removeFavorite', (req:any, res:any) => {});
app.get('/api/getFavorite', (req:any, res:any) => {});

// Cart APIs
app.post('/api/addToCart', (req:any, res:any) => {});
app.post('/api/removeFromCart', (req:any, res:any) => {});
app.get('/api/getCart', (req:any, res:any) => {});

// Random Gen Books APIs
app.put('/api/genRandomBooks', async(req:any, res:any) => {
    const getRandomDateWithinLastYear = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const oneYearAgo = currentYear - 1;
        
        // Generate a random year within the last ten years
        const randomYear = Math.floor(Math.random() * 1) + oneYearAgo;
        
        // Generate a random month (0-11 corresponds to January-December)
        const randomMonth = Math.floor(Math.random() * 12);
        
        // Generate a random day within the selected month and year
        const randomDay = Math.floor(Math.random() * (new Date(randomYear, randomMonth + 1, 0).getDate())) + 1;
        
        // Create and return the random date
        return new Date(randomYear, randomMonth, randomDay);
    }
    
    const numBooks = req.query.numBooks ? req.query.numBooks : 15 as number;

    for(let i = 0; i < numBooks; i++) {
        const randomBook = {
            title: Math.random().toString(36).substring(7) as string,
            author: Math.random().toString(36).substring(7) as string,
            price: Math.floor(Math.random() * 1000000) as number,
            sales: Math.floor(Math.random() * 1000000) as number,
            genre: Array(5).fill(0).map(() => Math.random().toString(36).substring(7) as string) as Array<string>,
            publisher: Math.random().toString(36).substring(7) as string,
            publishDate: getRandomDateWithinLastYear().toISOString() as string,
            language: Math.random().toString(36).substring(7) as string
        } as Dictionary<any>;
    
        await booksModel.create(randomBook).then(() => {
            // console.log('Random book inserted');
        }).catch((err) => {
            console.error(err);
        });
    }
    res.send('Random books generated');
});

app.delete('/api/delRandomBooks', async(req:any, res:any) => {
    await booksModel.deleteMany({}).then(() => {
        // console.log('Random books deleted');
    }).catch((err) => {
        console.error(err);
    });
    res.send('Random books deleted');
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

