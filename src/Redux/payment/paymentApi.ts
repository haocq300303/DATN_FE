import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPayment } from "~/interfaces/payment.type";

const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
    }),
    endpoints: (builder) => ({
        getAllPaymentByUserId: builder.query<{ data: IPayment[] }, void>({
            query: () => "/api/payments",
        }),
    }),
});

export const { useGetAllPaymentByUserIdQuery } = paymentApi;
export default paymentApi;
