import {createSlice} from '@reduxjs/toolkit';
import {fetchUsers, addUser, addRandomUser, removeUser} from '../store.jsx';

const usersSlice = createSlice({

    name: "users",
    initialState: {
        data: [],
        isLoading: false,
        error: null,
        term: ""
    },
    reducers: {
        changeTerm: (state, action) => {
            state.term = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.isLoading = true
             })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error
            })

            ///////////////////////////////

            .addCase(addUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.data.push(action.payload)
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error
            })

            ///////////////////////////////

            .addCase(addRandomUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(addRandomUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.data.push(action.payload)
            })
            .addCase(addRandomUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error
            })

            ///////////////////////////////

            .addCase(removeUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.isLoading = false

                const updatedArr = state.data.filter(function (user) {
                    return user.id !== action.payload.id
                })

                state.data = updatedArr

            })
            .addCase(removeUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error
            })


    }


})

export const usersReducer = usersSlice.reducer

export {
    usersSlice,

}

export const {changeTerm} = usersSlice.actions