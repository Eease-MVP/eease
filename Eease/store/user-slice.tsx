import { createSlice } from '@reduxjs/toolkit'
import { Gender, Language } from '../constants/ProfileInfo';

export interface User {
    username?: string,
    gender?: Gender,
    age?: number,
    language?: Language,
    //location: Location?| undefined,
}

export interface RootState {
    user: User;
  }
const initialState: User = {}

export function isFilled(user: User) {
    return user.username && user.gender && user.age && user.language
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state: User, action) => {
            state.username = action.payload.username;
            state.gender = action.payload.gender;
            state.age = action.payload.age;
            state.language = action.payload.language;
        },
        deleteUser: (state: User) => {
            state.username = undefined;
            state.gender = undefined;
            state.age = undefined;
            state.language = undefined;
        },
    },
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;