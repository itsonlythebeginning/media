import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {delayFn} from '../store.jsx';
import {faker} from '@faker-js/faker';


// <img src={faker.image.personPortrait({size: '256'})}/>


const photosApi = createApi({

    reducerPath: "photos",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005",
        fetchFn: async (...args) => {
            await delayFn(700)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => {
        return {

            fetchPhotos: builder.query({
                providesTags: (result, error, arg) => {
                    const tags = result.map(function (photo) {
                        return {type: "Photo", id: photo.parentId}
                    })
                    tags.push({type: "AlbumPhoto", id: arg.id})
                    return tags
                },
                query: (album) => {
                    return {
                        url: "/photos",
                        params: {
                            parentId: album.id
                        },
                        method: "GET"
                    }
                }
            }),

            addPhoto: builder.mutation({
                invalidatesTags: (result, error, arg) => {
                    return [{type: "AlbumPhoto", id: arg.id}]
                },
                query: (album) => {
                    return {
                        url: "/photos",
                        method: "POST",
                        body: {
                            parentId: album.id,
                            url: faker.image.personPortrait({size: '256'})
                        }
                    }
                }
            }),

            removePhoto: builder.mutation({
                invalidatesTags: (result, error, arg) => {
                    return [{type: "Photo", id: arg.parentId}]
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: "DELETE"
                    }
                }


            })

        }
    }

})


export {photosApi}
export const {useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation} = photosApi