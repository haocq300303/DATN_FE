interface IShift{
    _id?: string;
    id_chirlden_pitch?: string;
    number_shift?:number;
    price : number;
    time_start:string;
    time_end:string;
    statusPitch?: boolean;
    date:string;
    createdAt?: string;
    updatedAt?: string;
}
export default IShift;