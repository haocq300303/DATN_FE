import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IChildrentPitch from "~/interfaces/childrentPitch";

const pitchApi = createApi({
    reducerPath: "pitchApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
    }),
    endpoints: (builder) => ({
        getAllChildrenPitchByPitchId: builder.query<{ data: IChildrentPitch[] }, string>({
            query: (pitchId) => ({ url: "/api/childrentPicth/parent/" + pitchId }),
        }),
    }),
});

export const { useGetAllChildrenPitchByPitchIdQuery } = pitchApi;
export default pitchApi;
