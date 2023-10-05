import { IUser } from "./user.type";

export interface IBooking {
    _id: string;
    shift_id: string;
    payment_id: string;
    user_booking: IUser;
    pitch: any;
}
