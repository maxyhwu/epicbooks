import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import { Dictionary } from 'express-serve-static-core';
import Jabber from 'jabber';
import jdenticon from 'jdenticon';
import mongoose, { ConnectOptions } from 'mongoose';
import nodemailer from 'nodemailer';
import { Config, adjectives, animals, colors, languages, names, uniqueNamesGenerator } from 'unique-names-generator';
import { booksType, cartItem, userType } from './types';

const app = express() as express.Application;
const port = 8000 as number;
dotenv.config();
const mongo_uri = process.env.MONGO_URI as string;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

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


// const cartItemSchema = new mongoose.Schema({
//     itemId: Number,
//     quantity: Number,
// });

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
    image: String,
    description: String
});

const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    address: String,
    favorite: [Number],
    cart: [] as cartItem[],
    salesCart: [] as cartItem[],
});

const booksModel = mongoose.model('books', booksSchema);
const usersModel = mongoose.model('users', usersSchema);
// const itemModel = mongoose.model("item", cartItemSchema)

app.get('/api', (req:any, res:any) => {
    res.send('Hello World!');
});

// Book APIs
app.get('/api/search', async(req:any, res:any) => {
    const input = req.query.input ? req.query.input as string : "hi";
    const result:booksType[] = await booksModel.find({title: {$regex: input, $options: 'i'}});
    res.send(result);
});

app.get('/api/getBestSellings', async(req:any, res:any) => {
    try {
        const bestSellings: booksType[] = await booksModel.find({}).sort({sales: -1});
        res.send(bestSellings);
    } catch (error) {
        res.status(500).send(error);
    }
    
});

app.get('/api/getRecommendations', async(req:any, res:any) => {
    const genres = req.query.genres as string;
    const genresArr = genres.split(',') as Array<string>;
    const recommendations:booksType[] = await booksModel.find({genre: {$in: genresArr}});
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
    const bookId = Number(req.query.bookId) || 12345678;
    const bookInfo: booksType = await booksModel.findOne({id: bookId});
    if (!bookInfo) {
        res.status(404).send('Book not found');
    }
    else {
        res.send(bookInfo);
    }
});


// User APIs
// Max
// Using user schema
// User APIs
app.get('/api/login', async (req, res) => {
    const email = String(req.query.email);
    try {
        const result = await usersModel.findOne({ email });
        if (result) {
            res.send(result);
        } else {
            res.status(500).send('Login failed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/register', async(req:any, res:any) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        favorite: [],
        cart: [],
        salesCart: [],
    } as Dictionary<any>;
    await usersModel.create(newUser).then(() => {
        res.send('Register success');
    }).catch((err:any) => {
        console.error(err);
        res.send('Register failed');
    });
});

app.post('/api/forgotPassword', async(req:any, res:any) => {
    console.log("req.body: ", req.body);
    
    const username = req.body.username ? req.body.username : 'nullUser' as string;
    const email = req.body.email ? req.body.email : 'nullUser' as string;

    // Generate a random token
    const generateToken = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 10; i++) {
            token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return token;
    };

    const sendResetEmail = async(username: string, email: string) => {
        // Generate a token
        const token: string = generateToken();
        const link: string = `https://webapp-epicbooks.vercel.app/reset-password?token=${token}`;

        // Create a nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'epicbooks.tw@gmail.com',
                pass: 'lnkmqbrvknerhmay'
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
            await transporter.sendMail(mailOptions).then(() => {
                res.send({
                    message: 'Password reset email sent',
                    link: link,
                    token: token
                });
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Failed to send password reset email');
        }
    };


    // sendResetEmail(username, email);

    await usersModel.findOne({username: username, email: email}).then((result:any) => {
        if(result) {
            sendResetEmail(username, email);
        } else {
            res.send('Username and email cannot match');
        }
    });
});

app.post('/api/resetPassword', async(req: any, res: any) => {
    const { token, newPassword } = req.body;

    // Find the user with the token
    await usersModel.findOne({ token: token }).then(async (user: any) => {
        if (!user) {
            return res.status(401).send('Invalid or expired token');
        }

        // Update the user's password
        user.password = newPassword;
        user.token = undefined;

        // Save the updated user
        await user.save();
        res.send('Password reset successful');
    });
});

app.get('/api/getUserInfo', async (req, res) => {
    const username = String(req.query.username);
    try {
        const result: userType = await usersModel.findOne({ username });
        if (result) {
            res.send(result);
        }
        else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
    };
});

// MyFavorite APIs
app.post('/api/addFavorite', async(req:any, res:any) => {
    const username = req.query.username ? req.query.username : "nullUser" as string;
    const bookId = req.query.bookId ? req.query.bookId : 12345678 as number;
    await usersModel.findOne({username: username}).then(async(user:any) => {
        if(user) {
            if(user.favorite.includes(bookId)) {
                res.send('Already in favorite');
            }
            else {
                user.favorite.push(bookId);
                await usersModel.updateOne({username: username}, user).then(() => {
                    res.send('Added to favorite');
                }).catch((err:any) => {
                    console.error(err);
                });
            }
        }
        else {
            console.log("I didn't found: \n"+ user)
            res.send('User not found');
        }
    }).catch((err:any) => {
        console.error(err);
    });
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
        const user:userType = await usersModel.findOne({ username });
        if (user) {
            const favList = user.favorite;
            res.json(favList);
        } else {
            res.status(404).send('User not found');
        }
    }catch(err){
        console.error(err);
    };
});

// Cart APIs
app.post('/api/addToCart', async(req:any, res:any) => {
    const username = req.query.username ? req.query.username : "nullUser" as string;
    const bookId = Number(req.query.bookId) || 12345678;
    const quantity = Number(req.query.quantity) || 1;
    const user = await usersModel.findOne({ username });
    if (user) {
        const idList:Number[] = [];
        user.cart.forEach((item:cartItem) => {
            idList.push(item.itemId);
        });
        const index = idList.findIndex((id) => id === bookId);
        if (index != -1) {
            const newQuantity =  Number(user.cart[index].quantity) + quantity;   
            await usersModel.updateOne({ username }, {$set: {[`cart.${index}.quantity`]: newQuantity}});
            res.send('Added another to cart');
        } else {
            user.cart.push({ itemId: bookId, quantity });
            await user.save();
            res.send('Added to cart');
        }

        // await user.save();
    } else {
        res.status(404).send('User not found');
    }
});

app.post('/api/removeFromCart', async(req:any, res:any) => {
    const username = req.query.username as string || 'nullUser';
    const bookId = Number(req.query.bookId) || 12345678;
    try {
        const user = await usersModel.findOne({ username });
        if (user) {
            const cartItem = user.cart.find((item: cartItem) => item.itemId === bookId);
            if (cartItem) {
                user.cart = user.cart.filter((item: cartItem) => item.itemId !== bookId);
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

app.post('/api/clearCart', async(req:any, res:any) => {
    const username = req.query.username as string || 'nullUser';
    try {
        const user = await usersModel.findOne({ username });
        if (user) {
            user.cart = [];
            await usersModel.updateOne({username: username}, user).then(() => {
                res.send('Clear the cart');
            }).catch((err:any) => {
                console.error(err);
            });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/getCart', async(req:any, res:any) => {
    const username = req.query.username ? req.query.username : "nullUser" as string;
    await usersModel.findOne({username: username}).then((user:any) => {
        if(user) {
            res.send(user.cart);
        }
        else {
            res.send('User not found');
        }
    }).catch((err:any) => {
        console.error(err);
    });
});

// Salescart APIs
app.post('/api/addToSalesCart', async(req:any, res:any) => {
    const username = req.query.username ? req.query.username : "nullUser" as string;
    const bookId = req.query.bookId ? req.query.bookId : 12345678 as number;
    const quantity = Number(req.query.quantity) || 1;
    await usersModel.findOne({username: username}).then(async(user:any) => {
        if (user) {
            const idList:Number[] = [];
            user.salesCart.forEach((item:cartItem) => {
                idList.push(item.itemId);
            });
            const index = idList.findIndex((id) => id === bookId);
            if (index != -1) {
                const newQuantity =  Number(user.salesCart[index].quantity) + quantity;   
                await usersModel.updateOne({ username }, {$set: {[`salesCart.${index}.quantity`]: newQuantity}});
                res.send('Added another to sale cart');
            } else {
                user.salesCart.push({ itemId: bookId, quantity });
                await user.save();
                res.send('Added to sale cart');
            }
        }
        else {
            res.send('User not found');
        }
    }).catch((err:any) => {
        console.error(err);
    });
});

app.post('/api/removeFromSalesCart', async(req:any, res:any) => {
    const username = req.query.username as string || 'nullUser';
    const bookId = Number(req.query.bookId) || 12345678;
    try {
        const user = await usersModel.findOne({ username });
        if (user) {
            const cartItem = user.salesCart.find((item: cartItem) => Number(item.itemId) === bookId);
            if (cartItem) {
                user.salesCart = user.salesCart.filter((item: cartItem) => Number(item.itemId) !== bookId);
                await user.save();
                res.send('Removed from sales cart');
            } else {
                res.send('Not in sales cart');
            }
            
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/getSalesCart', async(req:any, res:any) => {
    const username = req.query.username ? req.query.username : "nullUser" as string;
    await usersModel.findOne({username: username}).then((user:any) => {
        if(user) {
            res.send(user.salesCart);
        }
        else {
            res.send('User not found');
        }
    }
    ).catch((err:any) => {
        console.error(err);
    });
});

app.post('/api/clearSalesCart', async(req:any, res:any) => {
    const username = req.query.username as string || 'nullUser';
    try {
        const user = await usersModel.findOne({ username });
        if (user) {
            user.salesCart = [];
            await usersModel.updateOne({username: username}, user).then(() => {
                res.send('Clear the sale cart');
            }).catch((err:any) => {
                console.error(err);
            });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});



// Random Gen Books APIs
app.get('/api/getRandomBooks', async(req:any, res:any) => {
    const randomBooks = await booksModel.find({});
    res.send(randomBooks);
});

app.put('/api/genRandomBooks', async(req:any, res:any) => {
    const getRandomDateWithinLastYear = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        // Generate a random year within the last ten years
        const randomYear = Math.floor(currentYear+0.5-Math.random());
        // Generate a random month (0-11 corresponds to January-December)
        const randomMonth = randomYear === currentYear ? Math.floor(Math.random() * (currentDate.getMonth() + 1)) : Math.floor(Math.random() * 12);
        // Generate a random day within the selected month and year
        const randomDay = randomYear === currentYear && randomMonth === currentDate.getMonth() ? Math.floor(Math.random() * currentDate.getDate()) : Math.floor(Math.random() * 31);
        // Create and return the random date
        return new Date(randomYear, randomMonth, randomDay);
    }

    const genToday = () => {
        const today = new Date();
        return today;
    }

    const genLastSevenDays = () => {
        const today = new Date();
        const lastSevenDays = new Date(today);
        lastSevenDays.setDate(today.getDate() - 7);
        return lastSevenDays;
    }

    const genLastThirtyDays = () => {
        const today = new Date();
        const lastThirtyDays = new Date(today);
        lastThirtyDays.setDate(today.getDate() - 30);
        return lastThirtyDays;
    }

    const genLastNinetyDays = () => {
        const today = new Date();
        const lastNinetyDays = new Date(today);
        lastNinetyDays.setDate(today.getDate() - 90);
        return lastNinetyDays;
    }

    const decideRandomDate = () => {
        const random = Math.floor(Math.random() * 6);
        switch(random) {
            case 0:
                return genToday();
            case 1:
                return genLastSevenDays();
            case 2:
                return genLastThirtyDays();
            case 3:
                return genLastNinetyDays();
            default:
                return getRandomDateWithinLastYear();
        }
    }

    const numBooks = req.query.numBooks ? req.query.numBooks : 15 as number;
    const randomNameConfig: Config = {
        dictionaries: [names, names],
        separator: ' ' as string,
        length: 2
    };
    const randomLanguageConfig: Config = {
        dictionaries: [languages],
        length: 1
    };
    const randomTitleConfig: Config = {
        dictionaries: [adjectives, colors, animals, languages, names],
        separator: ' ' as string,
        length: 3,
        style: 'capital' as any
    };
    const genres = [
        'animals',
        'romance',
        'adventure',
        'kids'
    ]
    for(let i = 0; i < numBooks; i++) {
        const title = uniqueNamesGenerator(randomTitleConfig) as string;
        const jabber = new Jabber;
        const description = jabber.createParagraph(50);
        const randomDate = decideRandomDate().toISOString() as string;
        const randomBook = {
            id: Math.floor(Math.random() * 1000000) as number,
            title: title,
            author: uniqueNamesGenerator(randomNameConfig) as string,
            price: Math.floor(Math.random() * 1000000) as number,
            sales: Math.floor(Math.random() * 1000000) as number,
            genre: genres.sort(() => Math.random() - 0.5).slice(0, Math.ceil(Math.random() * (genres.length-1))) as Array<string>,
            publisher: uniqueNamesGenerator(randomNameConfig) as string,
            publishDate: randomDate,
            language: uniqueNamesGenerator(randomLanguageConfig) as string,
            image: jdenticon.toSvg(Math.random().toString(36).substring(7), 200) as string,
            description: description,
        } as Dictionary<any>;

        await booksModel.create(randomBook).then(() => {
            // console.log('Random book inserted');
        }).catch((err:any) => {
            console.error(err);
        });
    }
    res.send('Random books generated');
});

app.delete('/api/delRandomBooks', async(req:any, res:any) => {
    await booksModel.deleteMany({}).then(() => {
        // console.log('Random books deleted');
    }).catch((err:any) => {
        console.error(err);
    });
    res.send('Random books deleted');
});

// Gen Null User APIs
app.put('/api/genNullUser', async(req:any, res:any) => {
    const nullUser = {
        username: 'nullUser',
        password: 'nullUser',
        email: 'jscnn51011@gmail.com',
        phone: 'nullUser',
        address: 'nullUser',
        favorite: [],
        cart: []
    } as Dictionary<any>;

    await usersModel.findOne({username: 'nullUser'}).then(async(user:any) => {
        if(user) {
            await usersModel.updateOne({username: 'nullUser'}, nullUser).then(() => {
                // console.log('Null user updated');
            }).catch((err:any) => {
                console.error(err);
            });
        }
        else {
            await usersModel.create(nullUser).then(() => {
                // console.log('Null user inserted');
            }).catch((err:any) => {
                console.error(err);
            });
        }
    }).catch(async(err:any) => {
        console.error(err);
    });
    res.send('Null user generated');
});

app.delete('/api/delNullUser', async(req:any, res:any) => {
    await usersModel.deleteOne({username: 'nullUser'}).then(() => {
        // console.log('Null user deleted');
    }).catch((err:any) => {
        console.error(err);
    });
    res.send('Null user deleted');
});

app.get('/api/getNullUser', async(req:any, res:any) => {
    const nullUser = await usersModel.findOne({username: 'nullUser'});
    res.send(nullUser);
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});