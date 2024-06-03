export type booksType = {
  id: number,
  title: string,
  author: string,
  price: number,
  sales: number,
  genre: [string],
  publisher: string,
  publishDate: Date,
  language: string,
  image: string,
  description: string,
};

export type cartItem ={
  itemId: number,
  quantity: number,
}

export type userType = {
  _id: string,
  username: string,
  password: string,
  email: string,
  phone: string,
  address: string,
  favorite: [number],
  cart: [cartItem],
  salesCart: [cartItem],
};