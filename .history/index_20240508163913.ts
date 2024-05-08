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
    publishDate: String,
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
app.get('/api/getBestSellings', (req:any, res:any) => {
    const bestSellings = booksModel.find({}).sort({sales: -1});
});
app.get('/api/getRecommendations', (req:any, res:any) => {
    const genres = req.query.genres as Array<string>;
});
app.get('/api/getNewArrival', (req:any, res:any) => {
    const recent = req.query.recent as number;
    // get recent books
    // return recent books
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
    const numBooks = req.query.numBooks as number;
    for(let i = 0; i < numBooks; i++) {
        const randomBook = {
            title: Math.random().toString(36).substring(7),
            author: Math.random().toString(36).substring(7),
            price: Math.floor(Math.random() * 1000000),
            sales: Math.floor(Math.random() * 1000000),
            genre: Array(5).fill(Math.random().toString(36).substring(7)),
            publisher: Math.random().toString(36).substring(7),
            publishDate: Math.random().toString(36).substring(7),
            language: Math.random().toString(36).substring(7)
        }
    
        await booksModel.create(randomBook).then(() => {
            console.log('Random book inserted');
        }).catch((err) => {
            console.error(err);
        });
    }
    res.send('Random books generated');
});

app.delete('/api/deleteRandomBooks', async(req:any, res:any) => {
    await booksModel.deleteMany({}).then(() => {
        console.log('Random books deleted');
        res.send('Random books deleted');
    }).catch((err) => {
        console.error(err);
    });
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

