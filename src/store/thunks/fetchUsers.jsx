import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const delayFn = (delay) => {
    return new Promise( (resolve) => {
        setTimeout( () => {
            resolve()
        }, delay )
    })
}



const fetchUsers = createAsyncThunk("users/fetch", async () => {

    const response = await axios.get("http://localhost:3005/users")
    await delayFn(1500)
    return response.data

})


export {fetchUsers, delayFn}