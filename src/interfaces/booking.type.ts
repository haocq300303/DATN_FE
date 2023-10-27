import { IUser } from "./user.type";

export interface IBooking {
    _id?: string;
    shift_id: string;
    pitch_id: string;
    payment_id: string;
    children_pitch_id: string;
    user_booking?: IUser;
    pitch?: any;
}
