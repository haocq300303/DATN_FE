import { IUser } from "./user.type";

export interface IPayment {
    _id?: string;
    user_bank?: IUser;
    code: string;
    status: string;
    payment_method: string;
    price: number;
    createdAt: string;
    updatedAt?: string;
}
