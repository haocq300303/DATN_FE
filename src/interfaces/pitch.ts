interface IPitch {
  _id?: string;
  address: string;
  name: string;
  admin_pitch_id: any;
  numberPitch: number;
  images: string[];
  services: string[];
  description: string[];
  location_id?: string;
  districts_id?: string;
  deposit_price: number;
  avatar: string;
  createdAt?: string;
  updatedAt?: string;
}

export default IPitch;
