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
            keepUnusedDataFor: 5
        }),
        getMenuImages: builder.query({
            query: () => ({
                url: UPLOAD_URL,
            }),
            // keepUnusedDataFor: 5
        }),
        deleteMenu: builder.mutation({
            query: () => ({
                url: `${UPLOAD_URL}/menudelete`,
                method: 'DELETE',
            }),
            keepUnusedDataFor: 5
        }),
    })
})

export const {
    useUploadMenuImageMutation,
    useGetMenuImagesQuery,
    useDeleteMenuMutation,
} = uploadApiSlice;