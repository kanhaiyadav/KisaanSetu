
export interface Product {
    _id: string;
    name: string;
    price: number;
    stocks: number;
    priceUnit: string;
    stocksUnit: string;
    description?: string;
    image: string;
    farmer: User;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    country?: string;
    state?: string;
    city?: string;
    address?: string;
    avatar?: string;
}

export interface Sale {
    _id: string;
    product: string;
    productName: string;
    priceUnit: string;
    stocksUnit: string;
    price: number;
    quantity: number;
    total: number;
    date: string;
    customer: string;
    userId: string;
}