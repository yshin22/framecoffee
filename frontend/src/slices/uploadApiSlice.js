import {UPLOAD_URL} from '../constants';
import { apiSlice } from './apiSlice';


export const uploadApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // getMenuImage: builder.query({
        //     query: (fileName) => ({
        //         url: `${UPLOAD_URL}/getmenuimage`,
        //         params: {
        //             fileName,
        //         },
        //     }),
        //     keepUnusedDataFor: 5,
        // }),
        uploadMenuImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}/menu`,
                method: 'POST',
                body: data,
            }),
        }),
    })
})

export const {
    useUploadMenuImageMutation,
    useGetMenuImageQuery,
} = uploadApiSlice;