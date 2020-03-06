export interface IRegisterVakidation {
    name: string;
    email: string;
    password: string;
}

export interface ICurseAdd {
    name: string;
    img: string;
    price: string;
}

export interface IAllCursessClient {
    _id?: any;
    name?: string;
    price?: string;
    image?: string;
}

export interface IBasketClient {
    _id?: any;
    curse?: string;
    id?: string;
    price?: string;
    count?: number;
}