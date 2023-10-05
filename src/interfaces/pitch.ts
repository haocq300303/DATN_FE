interface IPitch {
    _id?: string;
    address: string;
    name: string;
    admin_pitch_id: string;
    numberPitch: number;
    images: string[];
    description: string[];
    shift_id?: string;
    location_id?: string;
    deposit_price: number;
    avatar: string;
    createdAt?: string;
    updatedAt?: string;
}

export default IPitch;
