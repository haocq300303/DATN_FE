import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPayment } from '~/interfaces/payment.type';

const paymentApi = createApi({
  reducerPath: 'paymentApi',
  tagTypes: ['payment'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
  }),
  endpoints: (builder) => ({
    getAllPaymentByUserId: builder.query<{ data: IPayment[] }, any>({
      query: (params) => ({ url: '/api/payments', params }),
      providesTags: ['payment'],
    }),

    newPayment: builder.mutation<{ data: any }, IPayment>({
      query: (data) => ({ url: '/api/payments', body: data, method: 'POST' }),
      invalidatesTags: ['payment'],
    }),
  }),
});

export const { useGetAllPaymentByUserIdQuery, useNewPaymentMutation } = paymentApi;
export default paymentApi;
