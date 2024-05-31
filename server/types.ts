export type booksType = {
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
  description: String,
};

export type userType = {
  _id: String,
  username: String,
  password: String,
  email: String,
  phone: String,
  address: String,
  favorite: [Number],
  cart: [Number],
  salesCart: [Number]
};