import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBooking } from '~/interfaces/booking.type';

const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
  }),
  endpoints: (builder) => ({
    getAllBookingByUserId: builder.query<{ data: IBooking[] }, any>({
      query: (params) => ({ url: '/api/bookings', params }),
    }),
    getBookingByField: builder.query<{ data: IBooking }, { payment_id?: string; _id?: string }>({
      query: (params) => ({
        url: '/api/bookings/get-by-field',
        params,
      }),
    }),
    newBookingAfterPay: builder.mutation<{ data: IBooking; message: string }, IBooking>({
      query: (data) => ({
        url: '/api/bookings/affter-pay',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetAllBookingByUserIdQuery, useGetBookingByFieldQuery, useNewBookingAfterPayMutation } = bookingApi;
export default bookingApi;
