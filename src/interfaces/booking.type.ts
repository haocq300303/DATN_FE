import { IPayment } from "./payment.type";
import IPitch from "./pitch";
import { IService } from "./service";
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
    service_ids?: IService[];
    status: "success" | "cancel";
    updatedAt: string;
    //user đặt lịch thành công và user hủy bỏ lịch
}

export interface IInfoBooking {
    pitch: {
        _id: string;
        name: string;
        image: string;
        address: string;
    };
    children_pitch: {
        _id: string;
        children_pitch_code: string;
    };
    admin_pitch: {
        _id: string;
        name: string;
        phone: string;
    };
    shift: {
        _id: string;
        price: number;
        shift_day: string;
    };
    services?: { _id: string; name: string; image: string; price: number }[];
}
