import {configureStore} from '@reduxjs/toolkit';
import {usersReducer} from './slices/usersSlice.jsx';
import {usersSlice} from './slices/usersSlice.jsx';
import {fetchUsers} from './thunks/fetchUsers.jsx';
import {delayFn} from './thunks/fetchUsers.jsx';
import {addUser} from './thunks/addUser.jsx';
import {addRandomUser} from './thunks/addRandomUser.jsx';
import {changeTerm} from './slices/usersSlice.jsx';
import {removeUser} from './thunks/removeUser.jsx';
import {albumsApi} from './apis/albumsApi.jsx';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
    useFetchAlbumsQuery,
    useLazyFetchAlbumsQuery,
    useAddAlbumMutation,
    useAddRandomAlbumMutation,
    useRemoveAlbumMutation
                        } from './apis/albumsApi.jsx';

import {photosApi} from './apis/photosApi.jsx';

import {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation,

                        } from './apis/photosApi.jsx';




const store = configureStore({

    reducer: {
        "users": usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware)
    }

})


setupListeners(store.dispatch)


export {
    store,

    usersSlice,
    changeTerm,
    fetchUsers,
    delayFn,

    addUser,
    addRandomUser,

    removeUser,

    useFetchAlbumsQuery,
    useLazyFetchAlbumsQuery,
    useAddAlbumMutation,
    useAddRandomAlbumMutation,
    useRemoveAlbumMutation,

    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation,


}