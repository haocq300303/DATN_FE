import IFeedback from "./feedback";

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
  feedback_id: IFeedback[];
  districts_id?: string;
  average_price: number;
  averageStars?: number;
  avatar: string;
  createdAt?: string;
  updatedAt?: string;
}

export default IPitch;
