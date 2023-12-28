// import { IInfoBooking } from './booking.type';
import { IUser } from './user.type';

export interface IPayment {
  _id?: string;
  user_bank?: IUser;
  code: string;
  status: string;
  payment_method: string;
  price_received: number;
  total_received: number;
  message: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BillBankingProps {
  payment_id: string;
  userBank?: {
    fullname: string;
    phone: string;
  };
  userReceiver?: {
    fullname: string;
    phone: string;
  };
  infoBooking?: any;
  payment?: IPayment;
}
