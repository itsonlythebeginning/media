import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {faker} from '@faker-js/faker';
import {delayFn} from '../store.jsx';



const addRandomUser = createAsyncThunk("users/addRandom", async () => {

    const response = await axios.post("http://localhost:3005/users", {name: faker.person.fullName()})
    await delayFn(1500)
    return response.data

})


export {addRandomUser}