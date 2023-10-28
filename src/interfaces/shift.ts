interface IShift{
    _id?: string;
    id_chirlden_pitch?: string;
    number_shift?:number;
    price : number;
    time_start:string;
    time_end:string;
    number_remain:number;
    statusPitch?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
export default IShift;