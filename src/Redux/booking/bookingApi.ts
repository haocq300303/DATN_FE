import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPayment } from "~/interfaces/payment.type";

const bookingApi = createApi({
    reducerPath: "bookingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
    }),
    endpoints: (builder) => ({
        getAllBookingByUserId: builder.query<{ data: IPayment[] }, void>({
            query: () => "/api/bookings",
        }),
    }),
});

export const { useGetAllBookingByUserIdQuery } = bookingApi;
export default bookingApi;
