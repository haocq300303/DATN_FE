interface IShift {
    _id: string;
    id_chirlden_pitch?: string;
    number_shift?: number;
    price: number;
    start_time: string;
    end_time: string;
    id_pitch: any;
    number_remain: number;
    status_shift: boolean;
    date: any;
    createdAt?: string;
    updatedAt?: string;
}
export default IShift;
