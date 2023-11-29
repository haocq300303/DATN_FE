import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IShift from "~/interfaces/shift";

const shiftApi = createApi({
    reducerPath: "shiftApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
    }),
    endpoints: (builder) => ({
        getShiftsByChildrenPitch: builder.query<{ data: IShift[] }, { childrenPitchId: string; params: any }>({
            query: ({ childrenPitchId, params }) => ({
                url: "/api/shift/childrent-pitch/" + childrenPitchId,
                method: "GET",
                params,
            }),
        })
    })
})


export const { useGetShiftsByChildrenPitchQuery } = shiftApi;
export default shiftApi;
