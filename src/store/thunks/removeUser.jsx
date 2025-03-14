import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {delayFn} from '../store.jsx';



const removeUser = createAsyncThunk("users/remove", async (user) => {

    const response = await axios.delete(`http://localhost:3005/users/${user.id}`)
    await delayFn(1500)
    return response.data

})


export {removeUser}