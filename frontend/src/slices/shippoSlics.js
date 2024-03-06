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
      validateAddress: builder.mutation({
        query: (data) => ({
          url: `${SHIPPO_URL}/validate`,
          method: 'POST',
          body: data,
        })
      }),
      calculateShipping: builder.mutation({
        query: (data) => ({
          url: `${SHIPPO_URL}/calcship`,
          method: 'POST',
          body: data,
        })
      })
    }),
});

export const { 
  useCreateLabelMutation,
  useValidateAddressMutation,
  useCalculateShippingMutation,
}  = shippoApiSlice;

