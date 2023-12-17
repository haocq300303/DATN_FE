interface IShift {
  _id?: string;
  id_chirlden_pitch?: string;
  number_shift?: number | null;
  price: number;
  start_time: string | null;
  end_time: string | null;
  id_pitch: any;
  status_shift: boolean;
  find_opponent?: string;
  date?: any;
  is_booking_month?: boolean;
  isCancelBooking?: boolean;
  createdAt?: string;
  updatedAt?: string;
  user?: any;
}
export default IShift;
