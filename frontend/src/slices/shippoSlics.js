import {SHIPPO_URL} from "../constants";
import {apiSlice} from "./apiSlice";

export const shippoApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createLabel: builder.mutation({
        query: (data) => ({
          url: SHIPPO_URL,
          method: 'POST',
          body: data,
        }),
      }),
    }),
});

export const { 
  useCreateLabelMutation
}  = shippoApiSlice;

