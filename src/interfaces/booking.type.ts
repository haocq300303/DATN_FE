import { IPayment } from "./payment.type";
import IPitch from "./pitch";
import IShift from "./shift";
import { IUser } from "./user.type";

export interface IBooking {
    _id?: string;
    shift_id: string;
    pitch_id: string;
    payment_id: string;
    children_pitch_id: string;
    user_booking?: IUser;
    payment?: IPayment;
    pitch?: IPitch;
    shift?: IShift;
    status: "success" | "cancel";
    updatedAt: string;
    //user đặt lịch thành công và user hủy bỏ lịch
}

export interface IInfoBooking {
    pitch_name: string;
    pitch_avatar: string;
    admin_pitch_id: string;
    admin_pitch_name: string;
    admin_pitch_phone: string;
    pitch_id: string;
    pitch_address: string;
    children_pitch_id: string;
    shift_id: string;
    price: number;
    booking_day: string;
}
