import express from 'express';
import { Dictionary } from 'express-serve-static-core';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

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
    id: Number,
    title: String,
    author: String,
    price: Number,
    sales: Number,
    genre: [String],
    publisher: String,
    publishDate: Date,
    language: String
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

app.get('/api', (req:any, res:any) => {
    res.send('Hello World!');
});

// Book APIs
app.get('/api/search', async(req:any, res:any) => {
    const input = req.query.input as string;
    const result = await booksModel.find({title: {$regex: input, $options: 'i'}});
    res.send(result);
});

app.get('/api/getBestSellings', async(req:any, res:any) => {
    const bestSellings = await booksModel.find({}).sort({sales: -1});
    res.send(bestSellings);
});

app.get('/api/getRecommendations', async(req:any, res:any) => {
    const genres = req.query.genres as Array<string>;
    const recommendations = await booksModel.find({genre: {$in: genres}});
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
// Max
// Using user schema
app.post('/api/login', (req:any, res:any) => {
    const username = req.body.username;
    const password = req.body.password;
    usersModel.findOne({username: username, password: password}).then((result) => {
        if(result) {
            res.send('Login success');
        } else {
            res.send('Login failed');
        }
    }
    ).catch((err) => {
        console.error(err);
    });
});
app.post('/api/register', (req:any, res:any) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        favorite: [],
        cart: []
    } as Dictionary<any>;
    usersModel.create(newUser).then(() => {
        res.send('Register success');
    }).catch((err) => {
        console.error(err);
        res.send('Register failed');
    });
});
app.post('/api/logout', (req:any, res:any) => {
    res.send('Logout success');
});
app.post('/api/forgotPassword', (req:any, res:any) => {
    const username = req.body.username;
    const email = req.body.email;

    // Generate a random token
    const generateToken = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 10; i++) {
            token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return token;
    };

    const sendResetEmail = async (username: string, email: string) => {

        // Generate a token
        const token: string = generateToken();
        const link: string = `http://localhost:3000/reset-password?token=${token}`;

        // Save the token in the database or any other storage mechanism

        // Create a nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'epicbooks.tw@gmail.com',
                pass: 'epicbooks'
            }
        });

        // Define the email options
        const mailOptions = {
            from: 'epicbooks.tw@gmail.com',
            to: email,
            subject: 'ePicBooks Password Reset',
            text: `Hello ${username},\n\nPlease click on the following link to reset your password:\n\n${link}\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nThe ePicBooks Team`
        };

        try {
            // Send the email
            await transporter.sendMail(mailOptions);
            res.send('Password reset email sent');
        } catch (error) {
            console.error(error);
            res.status(500).send('Failed to send password reset email');
        }
    };



    usersModel.findOne({username: username, email: email}).then((result) => {
        if(result) {
            sendResetEmail(username, email);
            res.send('Password reset email sent');
        } else {
            res.send('Username and email cannot match');
        }
    });
});

// Verify the token and reset the password
app.post('/api/resetPassword', async (req: any, res: any) => {
    const { token, newPassword } = req.body;

    // Verify the token against the stored token in the database or any other storage mechanism



    // Reset the password for the user associated with the token
    // ...

    res.send('Password reset successful');
});

app.get('/api/getUserInfo', (req:any, res:any) => {
    const username = req.query.username;
    usersModel.findOne({username: username}).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.error(err);
    });
});

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
            id: Math.floor(Math.random() * 1000000) as number,
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

