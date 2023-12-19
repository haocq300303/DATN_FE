import { IPayment } from './payment.type';
import IPitch from './pitch';
import { IService } from './service';
import IShift from './shift';
import { IUser } from './user.type';

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
  services?: IService[];
  status: 'success' | 'cancel';
  createdAt: any;
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
    code_chirldren_pitch: number;
  };
  admin_pitch: {
    _id: string;
    name: string;
    phone: string;
  };
  shift: {
    _id: string;
    price: number;
    totalPrice: number;
    shift_day: string;
    number_shift: number;
    start_time: string;
    end_time: string;
    date: string[];
    numberDate: number;
    find_opponent: string;
  };
  services?: { _id: string; name: string; image: string; price: number }[];
  type: string;
}
