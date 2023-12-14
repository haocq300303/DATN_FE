import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IService } from "~/interfaces/service";

const serviceApi = createApi({
    reducerPath: "serviceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
    }),
    endpoints: (builder) => ({
        getServices: builder.query<{ data: IService[] }, any>({
            query: (params) => ({ url: "/api/services", params }),
        }),
        getServicesByPitchId: builder.query<{ data: IService[] }, string>({
            query: (id) => ({ url: "/api/pitch/service/", id }),
        }),
    }),
});

export const { useGetServicesQuery, useGetServicesByPitchIdQuery } = serviceApi;
export default serviceApi;
