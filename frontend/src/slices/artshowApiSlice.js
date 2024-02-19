import { ARTSHOW_URL, UPLOAD_URL } from "../constants";
import {apiSlice} from "./apiSlice";

export const artshowApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getArtShows: builder.query({
            query: () => ({
                url: ARTSHOW_URL,
            }),
            providesTags: ['Artshow'],
            keepUnusedDataFor: 5,
        }),
        getArtShowDetails: builder.query({
            query: (artshowId) => ({
                url: `${ARTSHOW_URL}/${artshowId}`
            }),
            keepUnusedDataFor: 5,
        }),
        getArtShowFeat: builder.query({
            query: () => ({
                url: `${ARTSHOW_URL}/featured`,
            }),
            keepUnusedDataFor: 5,
        }),
        createArtShow: builder.mutation({
            query: () => ({
                url: `${ARTSHOW_URL}`,
                method: 'POST',
            }),
            invalidatesTags: ['Artshow'],
        }),
        updateArtShow: builder.mutation({
            query: (data) => ({
                url: `${ARTSHOW_URL}/${data.artshowId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Artshow'],
        }),
        uploadArtShowImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}/artshowimage`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteArtShow: builder.mutation({
            query: (artshowId) => ({
                url: `${ARTSHOW_URL}/${artshowId}`,
                method: 'DELETE',
            })
        }),
        updateFeat: builder.mutation({
            query: () => ({
                url: ARTSHOW_URL,
                method: 'PUT',
            })
        })
    })
});

export const {
    useGetArtShowsQuery,
    useGetArtShowDetailsQuery,
    useGetArtShowFeatQuery,
    useCreateArtShowMutation,
    useUpdateArtShowMutation,
    useUploadArtShowImageMutation,
    useDeleteArtShowMutation,
    useUpdateFeatMutation,
} = artshowApiSlice;