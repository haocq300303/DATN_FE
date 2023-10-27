import instance from "./config";

export const createUrlVnpay = (data: any) => {
    return instance.post("/vnpay/create-url", data);
};
