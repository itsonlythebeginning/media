import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {delayFn} from '../store.jsx';
import {faker} from '@faker-js/faker';


const albumsApi = createApi({

    reducerPath: "albums",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005",
        fetchFn: async (...args) => {
            await delayFn(700)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => {
        return {

            fetchAlbums: builder.query({
                providesTags: (result, error, arg) => {

                    const tags = result.map(function (album) {
                        return { type: 'Album', id: album.parentId }
                    })
                    tags.push({ type: 'UserAlbum', id: arg.id })

                    return tags
                },
                query: (user) => {
                    return {
                        url: "/albums",
                        params: {
                            parentId: user.id
                        },
                        method: "GET"
                    }
                }
            }),

            addAlbum: builder.mutation({
                invalidatesTags: (result, error,arg) => {
                    return [{ type: 'UserAlbum', id: arg.user.id }]
                },
                query: ({term, user}) => {
                    return {
                        url: "/albums",
                        method: "POST",
                        body: {
                            title: term,
                            parentId: user.id
                        }
                    }
                }
            }),

            addRandomAlbum: builder.mutation({
                invalidatesTags: (result, error,arg) => {
                    return [{ type: 'UserAlbum', id: arg.id }]
                },
                query: (user) => {
                    return {
                        url: "/albums",
                        method: "POST",
                        body: {
                            title: faker.commerce.productName(),
                            parentId: user.id
                        }
                    }
                }
            }),


            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, arg) => {
                    return [{ type: 'Album', id: arg.parentId }]
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: "DELETE",
                    }
                }
            })

        }
    }

})


export const
    {useFetchAlbumsQuery,
    useLazyFetchAlbumsQuery,
    useAddAlbumMutation,
    useAddRandomAlbumMutation,
    useRemoveAlbumMutation

    } = albumsApi

export {albumsApi}