interface IFeedback {
    _id?: string;
    id_user: string;
    id_pitch: string;
    quantity_star: number,
    createdAt?: string;
    updatedAt?: string;
}

export default IFeedback;