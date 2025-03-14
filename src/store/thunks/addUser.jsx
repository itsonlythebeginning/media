import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {delayFn} from '../store.jsx';

const addUser = createAsyncThunk( "users/add", async (name) => {

    const response = await axios.post("http://localhost:3005/users", {name: name})
    await delayFn(1500)
    return response.data

} )



export {addUser}