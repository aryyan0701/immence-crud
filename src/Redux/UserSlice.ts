import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface UserState{
    users: User[];
}

const initialState: UserState = {
    users: JSON.parse(sessionStorage.getItem('users') || '[]'), 
  };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>)=>{
            state.users.push(action.payload);
            sessionStorage.setItem('users', JSON.stringify(state.users)); 
        },
        removeUser: (state, action: PayloadAction<string>) =>{
            state.users = state.users.filter(user => user.email !== action.payload);
            sessionStorage.setItem('users', JSON.stringify(state.users));
        },
        editUser: (state, action: PayloadAction<User>) =>{
            const index = state.users.findIndex(user => user.email === action.payload.email);
            if (index !== -1){
                state.users[index] = action.payload;
                sessionStorage.setItem('users', JSON.stringify(state.users));
            }
        }
    }
})

export const { addUser, removeUser, editUser } = userSlice.actions;

export default userSlice.reducer;