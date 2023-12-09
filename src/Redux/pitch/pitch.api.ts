import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IChildrentPitch from "~/interfaces/childrentPitch";

const pitchApi = createApi({
  reducerPath: "pitchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  endpoints: (builder) => ({
    getAllChildrenPitchByPitchId: builder.query<
      { data: IChildrentPitch[] },
      string
    >({
      query: (pitchId) => ({ url: "/api/childrentPicth/parent/" + pitchId }),
    }),
    getChildrenPitchsByPitchBookingMonth: builder.query<
      { data: IChildrentPitch[] },
      string
    >({
      query: (pitchId) => ({
        url: "/api/childrentPicth/parent/booking-month/" + pitchId,
      }),
    }),
  }),
});

export const {
  useGetAllChildrenPitchByPitchIdQuery,
  useGetChildrenPitchsByPitchBookingMonthQuery,
} = pitchApi;
export default pitchApi;
