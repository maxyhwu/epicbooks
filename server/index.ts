import dotenv from 'dotenv';
import express from 'express';
import jdenticon from 'jdenticon';
import mongoose, { ConnectOptions } from 'mongoose';
import nodemailer from 'nodemailer';
import { Config, adjectives, animals, colors, languages, names, uniqueNamesGenerator } from 'unique-names-generator';
import { booksType } from './types';

const app = express();
const port = process.env.PORT || 8000;
dotenv.config();
const mongo_uri = process.env.MONGO_URI as string;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const booksSchema = new mongoose.Schema({
    id: Number,
    title: String,
    author: String,
    price: Number,
    sales: Number,
    genre: [String],
    publisher: String,
    publishDate: Date,
    language: String,
    image: String
});

const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    address: String,
    favorite: [Number],
    cart: [Number]
});

const booksModel = mongoose.model('books', booksSchema);
const usersModel = mongoose.model('users', usersSchema);

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// Book APIs
app.get('/api/search', async (req, res) => {
    const input = req.query.input as string;
    try {
        const result = await booksModel.find({ title: { $regex: input, $options: 'i' } });
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/getBestSellings', async (req, res) => {
    try {
        const bestSellings: booksType[] = await booksModel.find({}).sort({ sales: -1 });
        res.send(bestSellings);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/getRecommendations', async (req, res) => {
    const genres = req.query.genres as string;
    const genresArr = genres.split(',') as Array<string>;
    try {
        const recommendations = await booksModel.find({ genre: { $in: genresArr } });
        res.send(recommendations);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/getNewArrival', async (req, res) => {
    const limits = [
        [0, 1],
        [1, 7],
        [7, 30],
        [30, 90],
        [90, 365]
    ];
    const today = new Date();
    const newArrival = [];
    try {
        for (let i = 0; i < limits.length; i++) {
            const start = new Date(today);
            start.setDate(today.getDate() - limits[i][0]);
            const end = new Date(today);
            end.setDate(today.getDate() - limits[i][1]);
            const books = await booksModel.find({ publishDate: { $gte: end, $lt: start } });
            newArrival.push(books);
        }
        res.send(newArrival);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/getBookInfo', async (req, res) => {
    const bookId = Number(req.query.bookId);
    try {
        const bookInfo: booksType = await booksModel.findOne({ id: bookId }, {_id:0, __v:0});
        res.send(bookInfo);
    } catch (error) {
        res.status(500).send(error);
    }
});

// User APIs
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await usersModel.findOne({ username, password });
        if (result) {
            res.send('Login success');
        } else {
            res.send('Login failed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/register', async (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        favorite: [],
        cart: []
    };

    try {
        await usersModel.create(newUser);
        res.send('Register success');
    } catch (err) {
        console.error(err);
        res.status(500).send('Register failed');
    }
});

app.post('/api/logout', (req, res) => {
    res.send('Logout success');
});

app.post('/api/forgotPassword', async (req, res) => {
    const { username, email } = req.body;

    const generateToken = (): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 10; i++) {
            token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return token;
    };

    const sendResetEmail = async (username: string, email: string) => {
        const token: string = generateToken();
        const link: string = `http://localhost:3000/reset-password?token=${token}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'ePicBooks Password Reset',
            text: `Hello ${username},\n\nPlease click on the following link to reset your password:\n\n${link}\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nThe ePicBooks Team`
        };

        try {
            await transporter.sendMail(mailOptions);
            res.send('Password reset email sent');
        } catch (error) {
            console.error(error);
            res.status(500).send('Failed to send password reset email');
        }
    };

    try {
        const result = await usersModel.findOne({ username, email });
        if (result) {
            await sendResetEmail(username, email);
        } else {
            res.send('Username and email do not match');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/resetPassword', async (req, res) => {
    const { token, newPassword } = req.body;

    // Verify the token and reset the password logic goes here
    // ...

    res.send('Password reset successful');
});

app.get('/api/getUserInfo', async (req, res) => {
    const username = req.query.username as string;
    try {
        const result = await usersModel.findOne({ username });
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// MyFavorite APIs
app.post('/api/addFavorite', async (req, res) => {
    const username = req.query.username as string || 'nullUser';
    const bookId = Number(req.query.bookId) || 12345678;
    try {
        const user = await usersModel.findOne({ username });
        if (user) {
            if (user.favorite.includes(bookId)) {
                res.send('Already in favorite');
            } else {
                user.favorite.push(bookId);
                await user.save();
                res.send('Added to favorite');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/api/removeFavorite', async (req, res) => {
    const username = req.query.username as string || 'nullUser';
    const bookId = Number(req.query.bookId) || 12345678;
    try {
        const user = await usersModel.findOne({ username });
        if (user) {
            if (user.favorite.includes(bookId)) {
                user.favorite = user.favorite.filter((id: number) => id !== bookId);
                await user.save();
                res.send('Removed from favorite');
            } else {
                res.send('Not in favorite');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/getFavorite', async (req, res) => {
    const username = req.query.username as string || 'nullUser';
    try {
        const user = await usersModel.findOne({ username });
        if (user) {
            res.send(user.favorite);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Cart APIs
app.post('/api/addToCart', async (req, res) => {
    const username = req.query.username as string || 'nullUser';
    const bookId = Number(req.query.bookId) || 12345678;
    try {
        const user = await usersModel.findOne({ username });
        if (user) {
            if (user.cart.includes(bookId)) {
                res.send('Already in cart');
            } else {
                user.cart.push(bookId);
                await user.save();
                res.send('Added to cart');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/api/removeFromCart', async (req, res) => {
    const username = req.query.username as string || 'nullUser';
    const bookId = Number(req.query.bookId) || 12345678;
    try {
        const user = await usersModel.findOne({ username });
        if (user) {
            if (user.cart.includes(bookId)) {
                user.cart = user.cart.filter((id: number) => id !== bookId);
                await user.save();
                res.send('Removed from cart');
            } else {
                res.send('Not in cart');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/getCart', async (req, res) => {
    const username = req.query.username as string || 'nullUser';
    try {
        const user = await usersModel.findOne({ username });
        if (user) {
            res.send(user.cart);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Random Gen Books APIs
app.get('/api/getRandomBooks', async (req, res) => {
    try {
        const randomBooks: booksType[] = await booksModel.find({}, {_id:0, __v:0});
        res.send(randomBooks);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/api/genRandomBooks', async (req, res) => {
    const getRandomDateWithinLastYear = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const oneYearAgo = currentYear - 1;

        const randomYear = Math.floor(Math.random() * 1) + oneYearAgo;
        const randomMonth = Math.floor(Math.random() * 12);
        const randomDay = Math.floor(Math.random() * (new Date(randomYear, randomMonth + 1, 0).getDate())) + 1;

        return new Date(randomYear, randomMonth, randomDay);
    };

    const genres = ["adventure", "kids", "romance", "animals"];
    const numBooks = Number(req.query.numBooks) || 15;

    const randomNameConfig: Config = {
        dictionaries: [names, names],
        separator: ' ',
        length: 2
    };

    const randomLanguageConfig: Config = {
        dictionaries: [languages],
        length: 1
    };

    const randomTitleConfig: Config = {
        dictionaries: [adjectives, colors, animals, languages, names],
        separator: ' ',
        length: 3,
        style: 'capital'
    };

    for (let i = 0; i < numBooks; i++) {
        const randomBook = {
            id: Math.floor(Math.random() * 1000000),
            title: uniqueNamesGenerator(randomTitleConfig),
            author: uniqueNamesGenerator(randomNameConfig),
            price: Math.floor(Math.random() * 1000),
            sales: Math.floor(Math.random() * 10000),
            genre: genres.sort(() => Math.random() - 0.5).slice(0, Math.ceil(Math.random() * (genres.length - 1))),
            publisher: uniqueNamesGenerator(randomNameConfig),
            publishDate: getRandomDateWithinLastYear(),
            language: uniqueNamesGenerator(randomLanguageConfig),
            image: jdenticon.toSvg(Math.random().toString(36).substring(7), 200)
        };

        try {
            const book = await booksModel.findOne({ id: randomBook.id });
            if (book) {
                await booksModel.updateOne({ id: randomBook.id }, randomBook);
            } else {
                await booksModel.create(randomBook);
            }
        } catch (error) {
            console.error(error);
        }
    }

    res.send('Random books generated');
});

app.delete('/api/delRandomBooks', async (req, res) => {
    try {
        await booksModel.deleteMany({});
        res.send('Random books deleted');
    } catch (error) {
        res.status(500).send(error);
    }
});

// Gen Null User APIs
app.put('/api/genNullUser', async (req, res) => {
    const nullUser = {
        username: 'nullUser',
        password: 'nullUser',
        email: 'nullUser',
        phone: 'nullUser',
        address: 'nullUser',
        favorite: [],
        cart: []
    };

    try {
        const user = await usersModel.findOne({ username: 'nullUser' });
        if (user) {
            await usersModel.updateOne({ username: 'nullUser' }, nullUser);
        } else {
            await usersModel.create(nullUser);
        }
        res.send('Null user generated');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/api/delNullUser', async (req, res) => {
    try {
        await usersModel.deleteOne({ username: 'nullUser' });
        res.send('Null user deleted');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/getNullUser', async (req, res) => {
    try {
        const nullUser = await usersModel.findOne({ username: 'nullUser' });
        res.send(nullUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
