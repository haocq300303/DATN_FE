export interface IService {
    _id: string;
    name: string;
    price: number;
    admin_pitch_id?: string;
    pitch_id?: string;
    image: string;
}